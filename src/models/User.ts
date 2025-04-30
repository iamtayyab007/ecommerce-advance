import mongoose, { model, models, Schema, Document } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  name: string;
  address: string;
  phone: string;
  zipcode: string;
  role: "admin" | "customer" | "guest";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer", "guest"],
      default: "customer",
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
