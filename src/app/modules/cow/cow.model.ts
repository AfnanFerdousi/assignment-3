import mongoose from "mongoose";
import { CowModel, ICow } from "./cow.interface";

const cowSchema = new mongoose.Schema<ICow, CowModel>(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            enum: [
                "Dhaka",
                "Chottogram",
                "Barishal",
                "Rajshahi",
                "Sylhet",
                "Comilla",
                "Rangpur",
                "Mymensingh",
            ],
            required: true,
        },
        breed: {
            type: String,
            enum: [
                "Brahman",
                "Nellore",
                "Sahiwal",
                "Gir",
                "Indigenous",
                "Tharparkar",
                "Kankrej",
            ],
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        label: {
            type: String,
            required: true,
            enum: ["for sale", "sold out"],
            default: "for sale",
        },
        category: {
            type: String,
            required: true,
            enum: ["Dairy", "Beef", "Dual Purpose"],
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);

const Cow = mongoose.model<ICow, CowModel>("Cow", cowSchema);

export default Cow;
