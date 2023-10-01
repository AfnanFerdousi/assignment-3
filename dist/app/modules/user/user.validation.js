"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = require("zod");
exports.createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        role: zod_1.z.enum(["buyer", "seller"], {
            required_error: "Role is required",
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First Name is required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last Name is required",
            }),
        }),
        phoneNumber: zod_1.z.string({
            required_error: "Phone Number is required",
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
        }),
        income: zod_1.z.number({}).optional(),
        budget: zod_1.z.number().optional(),
    }),
});
exports.updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        role: zod_1.z.enum(["buyer", "seller"]).optional(),
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        phoneNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        income: zod_1.z.number({}).optional(),
        budget: zod_1.z.number().optional(),
    }),
});
