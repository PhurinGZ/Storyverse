import { connectToDatabase } from "@/lib/db";
import TimelineEvent from "@/models/TimelineEvent";
import { NextResponse } from "next/server";

// GET /api/timeline/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    const event = await TimelineEvent.findById(params.id);
    if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(event);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/timeline/[id]
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    const data = await req.json();
    const updated = await TimelineEvent.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE /api/timeline/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    await TimelineEvent.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
