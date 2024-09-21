// import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    // console.log("categories", categories);
    return NextResponse.json({
      success: true,
      message: "Fetched successfully",
      data: categories,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "failed to fetch categories" },
      { status: 500 }
    );
  }
}
