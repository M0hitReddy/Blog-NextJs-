import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Get the token from NextAuth using the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // If user is logged in and tries to access the login page, redirect to home
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if logged in
  }

  // If user is not logged in and tries to access a protected route (e.g., '/')
  if (!token && pathname === "/") {
    // return NextResponse.json({ message: "Not authenticated" }); // Return a message if not authenticated
    // return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if not authenticated
  }

  // Continue with the request if no conditions match
  if (!token && pathname === "/login") {
    return NextResponse.next();
  }
  return NextResponse.next();
}

// Apply middleware to the necessary routes
export const config = {
  matcher: ["/", "/login", "/api"], // Apply middleware to both "/" and "/login"
};
