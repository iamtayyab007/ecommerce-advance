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

  //const user = await client.users.getUser(userId);

  try {
    const { username, name, address, phone, zipcode, clerkId, email } =
      await req.json();

    const userExists = await User.findOne({ username });
    if (userExists) {
      return Response.json({ success: false, message: "user already exists" });
    }

    const saveUser = await User.create({
      clerkId,
      email,
      username,
      name,
      address,
      phone,
      zipcode,
    });
    const existingUser = await client.users.getUser(clerkId);
    await client.users.updateUser(clerkId, {
      publicMetadata: {
        ...existingUser.publicMetadata,
        requiredFieldsCompleted: true,
        username,
        name,
        address,
        phone,
        zipcode,
      },
    });

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
