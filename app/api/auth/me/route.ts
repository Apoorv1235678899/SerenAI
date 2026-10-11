import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Session lookup failed:", error);
    return NextResponse.json({ message: "Unable to check session" }, { status: 500 });
  }
}