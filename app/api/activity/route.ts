import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { inngest } from "@/lib/inngest/client";
import { Activity } from "@/models/Activity";

const activityTypes = [
  "meditation",
  "exercise",
  "walking",
  "reading",
  "journaling",
  "therapy",
];

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ message: "Authentication required" }, { status: 401 });

    const body = await request.json();
    if (
      typeof body.type !== "string" ||
      !activityTypes.includes(body.type) ||
      typeof body.name !== "string" ||
      !body.name.trim()
    ) {
      return NextResponse.json({ message: "A valid activity type and name are required." }, { status: 400 });
    }
    if (body.duration !== undefined && (!Number.isFinite(Number(body.duration)) || Number(body.duration) < 0)) {
      return NextResponse.json({ message: "Duration must be a non-negative number." }, { status: 400 });
    }

    await connectDB();
    const activity = await Activity.create({
      userId: user._id,
      type: body.type,
      name: body.name.trim(),
      description: typeof body.description === "string" ? body.description : undefined,
      duration: body.duration === undefined ? undefined : Number(body.duration),
      difficulty: typeof body.difficulty === "string" ? body.difficulty : undefined,
      feedback: typeof body.feedback === "string" ? body.feedback : undefined,
    });

    await inngest.send({
      name: "activity/completed",
      data: {
        userId: String(user._id),
        activityId: String(activity._id),
        type: activity.type,
        name: activity.name,
        duration: activity.duration,
        difficulty: activity.difficulty,
        feedback: activity.feedback,
        timestamp: activity.timestamp.toISOString(),
      },
    });
    return NextResponse.json({ success: true, data: activity }, { status: 201 });
  } catch (error) {
    console.error("Error saving activity:", error);
    return NextResponse.json({ message: "Failed to save activity." }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ message: "Authentication required" }, { status: 401 });

    const filter: Record<string, unknown> = { userId: user._id };
    if (request.nextUrl.searchParams.get("today") === "true") {
      const start = new Date();
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setUTCDate(end.getUTCDate() + 1);
      filter.timestamp = { $gte: start, $lt: end };
    }

    await connectDB();
    const data = await Activity.find(filter).sort({ timestamp: -1 }).limit(500).lean();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json({ message: "Failed to fetch activities." }, { status: 500 });
  }
}