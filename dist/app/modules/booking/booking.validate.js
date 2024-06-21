"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidationSchema = void 0;
const zod_1 = require("zod");
// Zod schema for the booking object
exports.bookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().min(1, { message: "Date is required" }),
        startTime: zod_1.z.string().min(1, { message: "Start time is required" }),
        endTime: zod_1.z.string().min(1, { message: "End time is required" }),
        user: zod_1.z.string().optional(),
        facility: zod_1.z.string().optional(),
        payableAmount: zod_1.z.number().optional(),
        isBooked: zod_1.z.enum(["confirmed", "unconfirmed", "canceled"]).optional(),
    }),
});
