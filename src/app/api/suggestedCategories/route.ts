import prisma from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { suggestCategories } from "../utils/categories";


export async function POST(req: NextRequest) {
  const { content } = await req.json();
  if (!content) {
    return NextResponse.json(
      { success: false, message: "No content provided" },
      { status: 400 }
    );
  }
  try {
    const categories = await prisma.category.findMany();
    // const categories = CATEGORIES;
    const suggestedCategories = suggestCategories(content, categories, 5);
    console.log(suggestedCategories, "suggestedCategories");
    return NextResponse.json(
      {
        success: true,
        message: "Fetched successfully",
        data: suggestedCategories,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      { success: false, message: "failed to suggest categories" },
      { status: 500 }
    );
  }
}
