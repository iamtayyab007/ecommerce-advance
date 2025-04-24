import mongoose, { Schema, Document, models } from "mongoose";

interface IGuest extends Document {
  name: string;
  email?: string; // Optional for guests
  address: string;
  phone: string;
  zipcode: string;
  userId?: Schema.Types.ObjectId; // Reference to the user once they register
  createdAt: Date;
  updatedAt: Date;
}

const guestSchema = new Schema<IGuest>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // Allow null values, since guests may not have an email
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
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      default: null, // Initially null, but will be updated when the guest becomes a user
    },
  },
  { timestamps: true }
);

const Guest = models.Guest || mongoose.model("Guest", guestSchema);

export default Guest;
