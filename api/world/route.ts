import { connectToDatabase } from "@/lib/db";
import World from "@/models/World";
import { NextResponse } from "next/server";

// GET /api/world?projectId=...
export async function GET(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json({ error: "Missing projectId" }, { status: 400 });
  }

  try {
    const worlds = await World.find({ project: projectId }).sort({ createdAt: -1 });
    return NextResponse.json(worlds);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/world
export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const data = await req.json();
    const world = await World.create(data);
    return NextResponse.json(world, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid data or server error" }, { status: 400 });
  }
}
