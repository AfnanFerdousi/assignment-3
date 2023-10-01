import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import Cow from "../cow/cow.model";
import User from "../user/user.model";
import { IOrder } from "./order.interface";
import Order from "./order.model";
import mongoose from "mongoose";
import { JwtPayload } from "jsonwebtoken";

const createOrderService = async (body: IOrder): Promise<IOrder> => {
    const cow = await Cow.findById({ _id: body.cow });
    const buyer = await User.findById({ _id: body.buyer });

    if (!cow || !buyer) {
        throw new ApiError(httpStatus.NOT_FOUND, "Cow or Buyer not found");
    }
    if (cow.label !== "for sale") {
        throw new ApiError(httpStatus.FORBIDDEN, "Cow is not for sale");
    }
    if (buyer.budget < cow.price) {
        throw new ApiError(
            httpStatus.FORBIDDEN,
            "You do not have enough money!"
        );
    }
    const seller = await User.findById({ _id: cow.seller });
    if (!seller) {
        throw new ApiError(httpStatus.FORBIDDEN, "Seller not found");
    }

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        await Cow.findByIdAndUpdate(
            body.cow,
            {
                label: "sold out",
            },
            { session, new: true }
        );

        await User.findByIdAndUpdate(
            body.buyer,
            {
                $set: { budget: buyer.budget - cow.price },
            },
            { session, new: true }
        );

        await User.findByIdAndUpdate(
            cow.seller,
            {
                $set: { income: seller.income + cow.price },
            },
            { session, new: true }
        );

        const newOrder = await Order.create(body);

        session.commitTransaction();
        return newOrder;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

const getAllOrdersService = async (): Promise<IOrder[]> => {
    const result = await Order.find({})
        .populate({
            path: "cow",
            model: "Cow",
            populate: {
                path: "seller",
                model: "User",
            },
        })
        .populate("buyer");
    return result;
};

const getSpecificOrderService = async (
    _id: string,
    userPayload: JwtPayload | null
): Promise<IOrder | null> => {
    const result: any = await Order.findById(_id)
        .populate({
            path: "cow",
            model: "Cow",
            populate: {
                path: "seller",
                model: "User",
            },
        })
        .populate("buyer");

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Order doesn't exist");
    }

    if (!userPayload) {
        throw new ApiError(httpStatus.FORBIDDEN, "Provide user");
    }

    const user = await User.findById(userPayload._id);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    const buyerId = result.buyer._id.toString();
    const sellerId = result.cow.seller._id.toString();

    if (buyerId !== user._id.toString() && sellerId !== user._id.toString()) {
        console.log(buyerId, user._id);
        throw new ApiError(httpStatus.FORBIDDEN, "You do not own this order!");
    }

    return result;
};

export default {
    createOrderService,
    getAllOrdersService,
    getSpecificOrderService,
};
