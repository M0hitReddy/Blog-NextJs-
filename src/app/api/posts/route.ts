// import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
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
