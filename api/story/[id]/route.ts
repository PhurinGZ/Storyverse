import { connectToDatabase } from "@/lib/db";
import Story from "@/models/Story";
import { NextResponse } from "next/server";

// GET /api/story/[id] - ดึงข้อมูลตอนนิยาย
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    const story = await Story.findById(params.id);
    if (!story) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(story);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/story/[id] - อัปเดตเนื้อหานิยาย
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    const body = await req.json();
    const updated = await Story.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/story/[id] - ลบตอนนิยาย
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    await Story.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


