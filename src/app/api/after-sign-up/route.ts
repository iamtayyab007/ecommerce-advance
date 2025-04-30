// /api/after-signup.ts
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { clerkId } = await req.json();
    const client = await clerkClient();

    await dbConnect();

    const user = await User.findOne({ clerkId });
    if (!user) throw new Error("User not found in DB");

    const role = user.role;
    const existingUser = await client.users.getUser(clerkId);

    // Merge existing publicMetadata
    await client.users.updateUser(clerkId, {
      publicMetadata: {
        ...existingUser.publicMetadata,
        role,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating role metadata:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
