import mongoose, { Schema } from "mongoose";
import { IOrder, OrderModel } from "./order.interface";

const oderSchema = new mongoose.Schema<IOrder, OrderModel>(
    {
        cow: {
            type: Schema.Types.ObjectId,
            ref: "Cow", // Replace "Cow" with the name of your cow model
            required: true,
        },
        buyer: {
            type: Schema.Types.ObjectId,
            ref: "User", // Replace "User" with the name of your user model
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);

const Order = mongoose.model<IOrder, OrderModel>("Order", oderSchema);

export default Order;
