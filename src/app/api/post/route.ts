import prisma from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId ?? "" },
      include: { author: true, categories: true, topics: true },
    });
    return NextResponse.json({
      success: true,
      message: "Fetched successfully",
      data: post,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { title, content, status } = body;
  const session = await getServerSession(options);
  console.log(body, session);
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content: JSON.stringify(content),
        status,
        authorId: String(session?.user.id) ?? "",
      },
    });
    return NextResponse.json({
      success: true,
      message: "Post created successfully",
      data: post.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "failed to create post" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");
  
  const body = await req.json();
  const { title, content, status } = body;
  const session = await getServerSession(options);
  console.log(body, session);
  try {
    const post = await prisma.post.update({
      where: { id: postId ?? "" },
      data: {
        title,
        content: JSON.stringify(content),
        status,
        authorId: String(session?.user.id) ?? "",
      },
    });
    return NextResponse.json({
      success: true,
      message: "Post updated successfully",
      data: post.id,
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "failed to update post" },
      { status: 500 }
    );
  }
}
