"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
// Define the zod schema for the user object
exports.createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z.string().email("Invalid email address"),
        password: zod_1.z.string().min(3, "Password must be at least 3 characters long"),
        phone: zod_1.z.string().min(1, "Phone is required"),
        role: zod_1.z.enum(["admin", "user"], {
            required_error: "Role is required",
        }),
        address: zod_1.z.string().min(1, "Address is required"),
    }),
});
exports.UserValidation = {
    createUserValidationSchema: exports.createUserValidationSchema,
};
