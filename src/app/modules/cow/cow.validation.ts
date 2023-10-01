import { z } from "zod";
import { cowBreeds, districts } from "./cow.constant";

export const createCowZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
        }),
        age: z.number({
            required_error: "Age is required",
        }),
        price: z.number({
            required_error: "Price is required",
        }),
        location: z.enum([...districts] as [string, ...string[]], {
            required_error: "Location is required",
        }),
        breed: z.enum([...cowBreeds] as [string, ...string[]], {
            required_error: "Breed is required",
        }),
        weight: z.number({
            required_error: "Weight is required",
        }),
        label: z.enum(["For Sale", "Sold Out"], {
            required_error: "Label is required",
        }),
        category: z.enum(["Dairy", "Beef", "Dual Purpose"], {
            required_error: "Category is required",
        }),
        seller: z.string({
            required_error: "Seller is required",
        }),
    }),
});

export const updateCowZodSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        age: z.number().optional(),
        price: z.number().optional(),
        location: z.enum([...districts] as [string, ...string[]]).optional(),
        breed: z.enum([...cowBreeds] as [string, ...string[]]).optional(),
        weight: z.number().optional(),
        label: z.enum(["For Sale", "Sold Out"]).optional(),
        category: z.enum(["Dairy", "Beef", "Dual Purpose"]).optional(),
        seller: z.string().optional(),
    }),
});
