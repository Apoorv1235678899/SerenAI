import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Mood } from "@/models/Mood";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ message: "Authentication required" }, { status: 401 });

    const period = request.nextUrl.searchParams.get("period") ?? "week";
    const days = period === "month" ? 30 : period === "year" ? 365 : 7;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    await connectDB();
    const history = await Mood.find({ userId: user._id, timestamp: { $gte: since } })
      .sort({ timestamp: -1 })
      .lean();
    const scores = history.map((entry) => entry.score);
    const data = {
      average: scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0,
      count: scores.length,
      highest: scores.length ? Math.max(...scores) : 0,
      lowest: scores.length ? Math.min(...scores) : 0,
      history,
    };
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching mood stats:", error);
    return NextResponse.json({ message: "Failed to fetch mood stats." }, { status: 500 });
  }
}