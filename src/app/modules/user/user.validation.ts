import { z } from "zod";

export const createUserZodSchema = z.object({
    body: z.object({
        password: z.string({
            required_error: "Password is required",
        }),
        role: z.enum(["buyer", "seller"], {
            required_error: "Role is required",
        }),
        name: z.object({
            firstName: z.string({
                required_error: "First Name is required",
            }),
            lastName: z.string({
                required_error: "Last Name is required",
            }),
        }),
        phoneNumber: z.string({
            required_error: "Phone Number is required",
        }),
        address: z.string({
            required_error: "Address is required",
        }),
        income: z.number({}).optional(),
        budget: z.number().optional(),
    }),
});

export const updateUserZodSchema = z.object({
    body: z.object({
        password: z.string().optional(),
        role: z.enum(["buyer", "seller"]).optional(),
        name: z
            .object({
                firstName: z.string().optional(),
                lastName: z.string().optional(),
            })
            .optional(),
        phoneNumber: z.string().optional(),
        address: z.string().optional(),
        income: z.number({}).optional(),
        budget: z.number().optional(),
    }),
});
