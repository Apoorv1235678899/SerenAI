import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { inngest } from "@/lib/inngest/client";
import { Mood } from "@/models/Mood";

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ message: "Authentication required" }, { status: 401 });

    const body = await request.json();
    const score = Number(body.score);
    if (!Number.isFinite(score) || score < 0 || score > 100) {
      return NextResponse.json({ message: "Score must be between 0 and 100." }, { status: 400 });
    }

    await connectDB();
    const mood = await Mood.create({
      userId: user._id,
      score,
      note: typeof body.note === "string" ? body.note : undefined,
      context: body.context,
      activities: Array.isArray(body.activities) ? body.activities : undefined,
    });

    await inngest.send({
      name: "mood/updated",
      data: {
        userId: String(user._id),
        mood: score,
        note: mood.note,
        context: mood.context,
        activities: mood.activities,
        timestamp: mood.timestamp.toISOString(),
      },
    });

    return NextResponse.json({ success: true, data: mood }, { status: 201 });
  } catch (error) {
    console.error("Error saving mood:", error);
    return NextResponse.json({ message: "Failed to save mood." }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ message: "Authentication required" }, { status: 401 });

    const params = request.nextUrl.searchParams;
    const filter: Record<string, unknown> = { userId: user._id };
    const timestamp: Record<string, Date> = {};
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");
    if (startDate && !Number.isNaN(Date.parse(startDate))) timestamp.$gte = new Date(startDate);
    if (endDate && !Number.isNaN(Date.parse(endDate))) timestamp.$lte = new Date(endDate);
    if (Object.keys(timestamp).length) filter.timestamp = timestamp;

    const parsedLimit = Number(params.get("limit"));
    const limit = Number.isInteger(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 500) : 100;
    await connectDB();
    const data = await Mood.find(filter).sort({ timestamp: -1 }).limit(limit).lean();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching mood history:", error);
    return NextResponse.json({ message: "Failed to fetch mood history." }, { status: 500 });
  }
}