import prisma from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  try {
    const topics = await prisma.topic.findMany({
      where: {
        name: {
          contains: query ?? "",
        },
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Fetched successfully",
        data: topics,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "failed to fetch topics" },
      { status: 500 }
    );
  }
}
