import { connectToDatabase } from "@/lib/db";
import TimelineEvent from "@/models/TimelineEvent";
import { NextResponse } from "next/server";

// GET /api/timeline?projectId=...
export async function GET(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json({ error: "Missing projectId" }, { status: 400 });
  }

  try {
    const events = await TimelineEvent.find({ project: projectId }).sort({ date: 1 });
    return NextResponse.json(events);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/timeline
export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const data = await req.json();
    const event = await TimelineEvent.create(data);
    return NextResponse.json(event, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid data or server error" }, { status: 400 });
  }
}
