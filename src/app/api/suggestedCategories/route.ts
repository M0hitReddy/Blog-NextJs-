import prisma from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { analyzeContent, suggestCategories } from "../utils/categories";

const CATEGORIES = [
  "Technology",
  "Programming",
  "Web Development",
  // "Data Science",
  "Exercise",
  "Movies",
  "Animation",
  "Music",
  "Pop Culture",
  "Science Fiction",
  "Art",
  "Artificial Intelligence",
  "Machine Learning",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "Mobile Development",
  "UI/UX Design",
  "Business",
  "Entrepreneurship",
  "Marketing",
  "Productivity",
  "Personal Development",
  "Health",
  "Fitness",
  "Travel",
  "Food",
  "Photography",
  "Music",
  "Art",
  "Literature",
  "Education",
  "Flowers",
];

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
