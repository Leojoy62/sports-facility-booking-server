import { z } from "zod";

// Zod schema for the booking object
export const bookingValidationSchema = z.object({
  body: z.object({
    date: z.string().min(1, { message: "Date is required" }),
    startTime: z.string().min(1, { message: "Start time is required" }),
    endTime: z.string().min(1, { message: "End time is required" }),
    user: z.string().optional(),
    facility: z.string().optional(),
    payableAmount: z.number().optional(),
    isBooked: z.enum(["confirmed", "unconfirmed", "canceled"]).optional(),
  }),
});
