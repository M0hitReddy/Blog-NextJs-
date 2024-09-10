import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = body as { id: number; name: string; email: string };

  if (user && user.id && user.name && user.email) {
    users.push(user);
    return NextResponse.json({success: true, message: "Inserted successfully", user});
  } else {
    return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
  }
}