import { connectToDatabase } from "@/lib/db";
import Story from "@/models/Story";
import { NextResponse } from "next/server";

// GET /api/story?projectId=...
export async function GET(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (!projectId)
    return NextResponse.json({ error: "Missing projectId" }, { status: 400 });

  try {
    const stories = await Story.find({ project: projectId }).sort({ createdAt: -1 });
    return NextResponse.json(stories);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/story
export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const body = await req.json();
    const story = await Story.create(body);
    return NextResponse.json(story, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid data or server error" }, { status: 400 });
  }
}
