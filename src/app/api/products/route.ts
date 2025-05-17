import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { existsSync } from "fs";
import Product from "@/models/product";
import dbConnect from "@/lib/dbConnect";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  await dbConnect();
  const formData = await req.formData();

  const name = formData.get("productName") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("productPrice") as string);
  const stock = parseInt(formData.get("stock") as string);

  const imageFile = formData.get("productImage");

  if (!imageFile || !(imageFile instanceof File)) {
    return NextResponse.json(
      { error: "Valid image file is required" },
      { status: 400 }
    );
  }

  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Ensure uploads directory exists
  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, imageFile.name);
  await writeFile(filePath, buffer);

  try {
    const cloudinaryFile = await cloudinary.uploader.upload(filePath, {
      folder: "products",
    });

    await unlink(filePath);

    const imageUrl = cloudinaryFile.secure_url;
    const product = new Product({
      name,
      description,
      price,
      stock,
      image: imageUrl,
    });
    await product.save();
    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Cloudinary upload failed" },
      { status: 500 }
    );
  }
}
