import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    const file = body?.file; // Expecting base64 file data
    if (!file) {
        return NextResponse.json(
            { success: false, message: "No file provided" },
            { status: 400 }
        );
    }

    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
            folder: "uploads", // Optional: Add a folder in Cloudinary
        });
        return NextResponse.json(
            { success: true, url: uploadResponse.secure_url },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Cloudinary upload failed" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get("imageUrl");
    if (!imageUrl) {
        return NextResponse.json(
            { success: false, message: "No image URL provided" },
            { status: 400 }
        );
    }

    try {
        const response = await cloudinary.uploader.upload(imageUrl, {
            folder: "uploads", // Optional: Add a folder in Cloudinary
            
        });
        return NextResponse.json(
            { success: true, url: response.secure_url },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Cloudinary upload failed" },
            { status: 500 }
        );
    }
}