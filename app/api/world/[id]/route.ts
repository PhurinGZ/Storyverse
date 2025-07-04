import { connectToDatabase } from "@/lib/db";
import World from "@/models/World";
import { NextResponse } from "next/server";

// GET /api/world/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    const world = await World.findById(params.id);
    if (!world) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(world);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/world/[id]
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    const data = await req.json();
    const updated = await World.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE /api/world/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    await World.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
