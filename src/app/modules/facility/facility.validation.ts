import { z } from "zod";

// Define the zod schema for the facility object
export const facilityValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    pricePerHour: z
      .number()
      .positive("Price per hour must be a positive number"),
    location: z.string().min(1, "Location is required"),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const updateFacilityValidationSchema =
  facilityValidationSchema.partial();
