import { connectToDatabase } from "@/lib/db";
import Invite from "@/models/CollaborationInvite";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

// PUT /api/collaboration/invite/[id]
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    const { status } = await req.json(); // accepted หรือ declined
    if (!["accepted", "declined"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const invite = await Invite.findByIdAndUpdate(params.id, { status }, { new: true });

    // ถ้าผู้ใช้ตอบรับ ให้เพิ่มเข้าร่วมใน project.collaborators
    if (invite && status === "accepted") {
      await Project.findByIdAndUpdate(invite.project, {
        $addToSet: { collaborators: invite.recipient },
      });
    }

    return NextResponse.json(invite);
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE /api/collaboration/invite/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    await Invite.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
