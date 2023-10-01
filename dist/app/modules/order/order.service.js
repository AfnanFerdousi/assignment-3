"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const order_model_1 = __importDefault(require("./order.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createOrderService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.default.findById({ _id: body.cow });
    const buyer = yield user_model_1.default.findById({ _id: body.buyer });
    if (!cow || !buyer) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow or Buyer not found");
    }
    if (cow.label !== "for sale") {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Cow is not for sale");
    }
    if (buyer.budget < cow.price) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You do not have enough money!");
    }
    const seller = yield user_model_1.default.findById({ _id: cow.seller });
    if (!seller) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Seller not found");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        yield cow_model_1.default.findByIdAndUpdate(body.cow, {
            label: "sold out",
        }, { session, new: true });
        yield user_model_1.default.findByIdAndUpdate(body.buyer, {
            $set: { budget: buyer.budget - cow.price },
        }, { session, new: true });
        yield user_model_1.default.findByIdAndUpdate(cow.seller, {
            $set: { income: seller.income + cow.price },
        }, { session, new: true });
        const newOrder = yield order_model_1.default.create(body);
        session.commitTransaction();
        return newOrder;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const getAllOrdersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find({})
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
});
const getSpecificOrderService = (_id, userPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findById(_id)
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
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order doesn't exist");
    }
    if (!userPayload) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Provide user");
    }
    const user = yield user_model_1.default.findById(userPayload._id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const buyerId = result.buyer._id.toString();
    const sellerId = result.cow.seller._id.toString();
    if (buyerId !== user._id.toString() && sellerId !== user._id.toString()) {
        console.log(buyerId, user._id);
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You do not own this order!");
    }
    return result;
});
exports.default = {
    createOrderService,
    getAllOrdersService,
    getSpecificOrderService,
};
