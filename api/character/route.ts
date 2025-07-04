import { connectToDatabase } from "@/lib/db";
import Character from "@/models/Character";
import { NextResponse } from "next/server";

// GET /api/character?projectId=...
export async function GET(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json({ error: "Missing projectId" }, { status: 400 });
  }

  try {
    const characters = await Character.find({ project: projectId }).sort({ createdAt: -1 });
    return NextResponse.json(characters);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/character
export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const data = await req.json();
    const character = await Character.create(data);
    return NextResponse.json(character, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid data or server error" }, { status: 400 });
  }
}
