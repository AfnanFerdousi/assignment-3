import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import service from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";
import { paginationFields } from "../../../constant/pagination";

//  create user
const createUser = catchAsync(async (req: Request, res: Response) => {
    const userData = req.body;
    const user = await service.createUserService(userData);

    sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully created user",
        data: user,
    });
});

// get all users from db
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, userFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await service.getAllUsersService(paginationOptions, filters);

    sendResponse<IUser[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully found user",
        data: result.data,
        meta: result.meta,
    });
});

//  get single user
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const result = await service.getSpecificUserService(req.params.id);

    sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully found specific user",
        data: result,
    });
});

// update single user
const updateUser = catchAsync(async (req: Request, res: Response) => {
    const result = await service.updateUserService(req.params.id, req.body);
    sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully updated user",
        data: result,
    });
});

// delete user
const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const result = await service.deleteUserService(req.params.id);
    sendResponse<IUser>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully deleted user",
        data: result,
    });
});


export default {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
