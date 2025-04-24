import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  await dbConnect();
  const { userId } = await auth();
  const client = await clerkClient();
  if (!userId) {
    return Response.json({
      message: "Unauthorized",
      status: 401,
    });
  }

  const user = await client.users.getUser(userId);

  try {
    const { username, name, address, phone, zipcode } = await req.json();

    const userExists = await User.findOne({ username });
    if (userExists) {
      return Response.json({ success: false, message: "user already exists" });
    }

    const saveUser = await User.create({
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      username,
      name,
      address,
      phone,
      zipcode,
    });
    await saveUser.save();
    return Response.json(
      {
        success: true,
        message: "User saved successfully in the database",
        userSaved: saveUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json({ success: false, message: error.message });
  }
}
