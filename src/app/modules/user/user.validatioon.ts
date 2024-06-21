import { z } from "zod";

// Define the zod schema for the user object
export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 3 characters long"),
    phone: z.string().min(1, "Phone is required"),
    role: z.enum(["admin", "user"], {
      required_error: "Role is required",
    }),
    address: z.string().min(1, "Address is required"),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};
