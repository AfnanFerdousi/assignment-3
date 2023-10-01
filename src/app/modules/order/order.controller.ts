import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IOrder } from "./order.interface";
import orderService from "./order.service";
import { Request, Response } from "express";

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const orderData = req.body;
    const order = await orderService.createOrderService(orderData);
    sendResponse<IOrder>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully created order",
        data: order,
    });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const orders = await orderService.getAllOrdersService();
    sendResponse<IOrder[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully retrieved orders",
        data: orders,
    });
});

const getSpecificOrder = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const result = await orderService.getSpecificOrderService(
        req.params.id,
        user
    );
    sendResponse<IOrder>(res, {
        data: result,
        message: "Successfully found order",
        statusCode: httpStatus.OK,
        success: true,
    });
});

export default {
    createOrder,
    getAllOrders,
    getSpecificOrder,
};
