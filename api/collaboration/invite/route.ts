import { connectToDatabase } from "@/lib/db";
import Invite from "@/models/CollaborationInvite";
import { NextResponse } from "next/server";

// POST /api/collaboration/invite
export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const data = await req.json();
    const invite = await Invite.create(data);
    return NextResponse.json(invite, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid data or server error" }, { status: 400 });
  }
}

// GET /api/collaboration/invite?userId=...
export async function GET(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const invites = await Invite.find({ recipient: userId }).populate("project sender");
    return NextResponse.json(invites);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
