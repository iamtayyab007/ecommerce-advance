import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(6, "Must 6 or more character long"),
  name: z.string(),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .max(100, "Address is too long")
    .regex(/^[a-zA-Z0-9\s,'\-./#]+$/, "Address contains invalid characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format"),
  zipcode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
});
