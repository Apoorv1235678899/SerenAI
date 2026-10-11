import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { ChatSession } from "@/models/ChatSession";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ message: "Authentication required" }, { status: 401 });

    const { sessionId } = await params;
    await connectDB();
    const session = await ChatSession.findOne({ sessionId, userId: user._id })
      .select("messages")
      .lean();
    if (!session) return NextResponse.json({ error: "Chat session not found" }, { status: 404 });
    return NextResponse.json(session.messages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 });
  }
}