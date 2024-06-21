import { z } from "zod";

export const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 3 characters long"),
  }),
});
