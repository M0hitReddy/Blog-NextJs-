import prisma from "@/lib/dbConnect";
import { Post } from "@/types/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  const body: Post = await req.json();
  console.log(body, "body");
  try {
    const topicsTobeInserted = body.topics?.filter((topic) => topic.id === "");
    if (topicsTobeInserted && topicsTobeInserted.length > 0) {
      
      // const createdTopics = await prisma.topic.createMany({
      //   data: topicsTobeInserted.map((topic) => ({ name: topic.name })),
      //   skipDuplicates: true,
      // });
      // Fetch the created topics to get their IDs
      const insertedTopics = await prisma.topic.findMany({
        where: {
          name: {
            in: topicsTobeInserted.map((topic) => topic.name),
          },
        },
      });
      // Update the body.topics with the new IDs
      body.topics = body.topics?.map((topic) => {
        const insertedTopic = insertedTopics.find((t) => t.name === topic.name);
        return insertedTopic ? { ...topic, id: insertedTopic.id } : topic;
      });
    }
    const post = await prisma.post.update({
      where: { id: postId ?? "" },
      data: {
        title: body.title,
        content: JSON.stringify(body.content),
        subtitle: body.subtitle,
        previewImage: body.previewImage,
        published: body.published,
        topics: {
          connect: body.topics?.map((topic) => ({ id: topic.id })),
        },
        categories: {
          connect: body.categories?.map((category) => ({
            id: category.id,
          })),
        },
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Post updated successfully",
        data: post.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "failed to update post" },
      { status: 500 }
    );
  }
}
