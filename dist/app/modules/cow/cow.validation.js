"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCowZodSchema = exports.createCowZodSchema = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
exports.createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        age: zod_1.z.number({
            required_error: "Age is required",
        }),
        price: zod_1.z.number({
            required_error: "Price is required",
        }),
        location: zod_1.z.enum([...cow_constant_1.districts], {
            required_error: "Location is required",
        }),
        breed: zod_1.z.enum([...cow_constant_1.cowBreeds], {
            required_error: "Breed is required",
        }),
        weight: zod_1.z.number({
            required_error: "Weight is required",
        }),
        label: zod_1.z.enum(["For Sale", "Sold Out"], {
            required_error: "Label is required",
        }),
        category: zod_1.z.enum(["Dairy", "Beef", "Dual Purpose"], {
            required_error: "Category is required",
        }),
        seller: zod_1.z.string({
            required_error: "Seller is required",
        }),
    }),
});
exports.updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.enum([...cow_constant_1.districts]).optional(),
        breed: zod_1.z.enum([...cow_constant_1.cowBreeds]).optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z.enum(["For Sale", "Sold Out"]).optional(),
        category: zod_1.z.enum(["Dairy", "Beef", "Dual Purpose"]).optional(),
        seller: zod_1.z.string().optional(),
    }),
});
