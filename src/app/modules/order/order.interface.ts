import mongoose, { Types } from "mongoose";

export type IOrder = {
    cow: Types.ObjectId;
    buyer: Types.ObjectId;
};

export type OrderModel = mongoose.Model<IOrder, object>;
