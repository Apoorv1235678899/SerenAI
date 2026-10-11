import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { connectDB } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth";
import { ChatSession } from "@/models/ChatSession";

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return NextResponse.json({ message: "Authentication required" }, { status: 401 });

    await connectDB();
    const session = await ChatSession.create({
      sessionId: randomUUID(),
      userId: user._id,
      startTime: new Date(),
      status: "active",
      messages: [],
    });
    return NextResponse.json(
      { message: "Chat session created successfully", sessionId: session.sessionId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating chat session:", error);
    return NextResponse.json(
      { error: "Failed to create chat session" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ message: "Authentication required" }, { status: 401 });

    await connectDB();
    const sessions = await ChatSession.find({ userId: user._id })
      .sort({ updatedAt: -1 })
      .select("sessionId messages startTime status createdAt updatedAt")
      .lean();
    return NextResponse.json(sessions);
  } catch (error) {
    console.error("Error listing chat sessions:", error);
    return NextResponse.json({ error: "Failed to list chat sessions" }, { status: 500 });
  }
}