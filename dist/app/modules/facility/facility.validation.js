"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFacilityValidationSchema = exports.facilityValidationSchema = void 0;
const zod_1 = require("zod");
// Define the zod schema for the facility object
exports.facilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        description: zod_1.z.string().min(1, "Description is required"),
        pricePerHour: zod_1.z
            .number()
            .positive("Price per hour must be a positive number"),
        location: zod_1.z.string().min(1, "Location is required"),
        isDeleted: zod_1.z.boolean().optional().default(false),
    }),
});
exports.updateFacilityValidationSchema = exports.facilityValidationSchema.partial();
