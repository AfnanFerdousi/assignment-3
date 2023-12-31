import mongoose from "mongoose";
import { IUser, UserModel } from "./user.interface";

const userSchema = new mongoose.Schema<IUser, UserModel>(
    {
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["seller", "buyer"],
            required: true,
            default: "buyer",
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        address: {
            type: String,
            required: true,
        },
        budget: {
            type: Number,
            required: true,
            default: 0,
        },
        income: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true, versionKey: false }
);

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
