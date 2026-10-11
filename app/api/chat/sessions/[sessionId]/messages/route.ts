import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/lib/inngest/client";
import { getAuthenticatedUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { generateChatReply } from "@/lib/chat-ai";
import { ChatSession } from "@/models/ChatSession";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ message: "Authentication required" }, { status: 401 });

    const { sessionId } = await params;
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message) return NextResponse.json({ message: "Message is required" }, { status: 400 });

    await connectDB();
    const session = await ChatSession.findOne({ sessionId, userId: user._id });
    if (!session) return NextResponse.json({ error: "Chat session not found" }, { status: 404 });

    await inngest.send({
      name: "therapy/session.message",
      data: {
        message,
        history: session.messages,
        memory: {
          userProfile: { emotionalState: [], riskLevel: 0, preferences: {} },
          sessionContext: { conversationThemes: [], currentTechnique: null },
        },
        goals: [],
        systemPrompt: "You are an empathetic and supportive AI therapy assistant. Maintain professional boundaries and consider user safety.",
      },
    });

    const { analysis, response } = await generateChatReply(message, session.messages);
    session.messages.push(
      { role: "user", content: message, timestamp: new Date() },
      {
        role: "assistant",
        content: response,
        timestamp: new Date(),
        metadata: {
          analysis,
          progress: {
            emotionalState: analysis.emotionalState,
            riskLevel: analysis.riskLevel,
          },
        },
      }
    );
    await session.save();

    return NextResponse.json({
      response,
      message: response,
      analysis,
      metadata: {
        progress: {
          emotionalState: analysis.emotionalState,
          riskLevel: analysis.riskLevel,
        },
      },
    });
  } catch (error) {
    console.error("Error processing chat message:", error);
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 });
  }
}