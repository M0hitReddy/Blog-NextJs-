// import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const published = searchParams.get("published") === "true";
  try {
    const posts = await prisma.post.findMany({
      where: published ? { published: true } : {published: false},
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({
      success: true,
      message: "Fetched successfully",
      data: posts,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "failed to fetch posts" },
      { status: 500 }
    );
  }
}

// export async function POST(req: NextRequest) {
//   const body = await req.json();
  
//   const { title, content, status } = body;
//   const session = await getServerSession(options);
//   console.log(body, session);
//   try {
//     const post = await prisma.post.create({
//       data: {
//         title,
//         content: JSON.stringify(content),
//         status,
//         authorId: String(session?.user.id) ?? "",
//       },
//     });
//     return NextResponse.json({
//       success: true,
//       message: "Post created successfully",
//       data: post.id,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, message: "failed to create post" },
//       { status: 500 }
//     );
//   }
// }
