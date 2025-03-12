import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get("token")?.value;

  // If no token is found, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify the token
    verify(token, JWT_SECRET);
    // If the token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    // If the token is invalid, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Specify the routes to protect
export const config = {
  matcher: ["/protected-route"], // Add the routes you want to protect
};
