import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, getRequestToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Session } from "@/models/Session";

export async function POST(request: NextRequest) {
  try {
    const token = getRequestToken(request);
    if (token) {
      await connectDB();
      await Session.deleteOne({ token });
    }

    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set(AUTH_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return response;
  } catch (error) {
    console.error("Logout failed:", error);
    return NextResponse.json({ message: "Unable to log out." }, { status: 500 });
  }
}