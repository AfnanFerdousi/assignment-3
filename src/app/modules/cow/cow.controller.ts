import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import service from "./cow.service";
import sendResponse from "../../../shared/sendResponse";
import { ICow } from "./cow.interface";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { cowFilterableFields } from "./cow.constant";
import { paginationFields } from "../../../constant/pagination";

const createCow = catchAsync(async (req: Request, res: Response) => {
    const result = await service.createCowService(req.body);
    sendResponse<ICow>(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: result,
        message: "Successfully created cow",
    });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, cowFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await service.getAllCowsService(paginationOptions, filters);

    sendResponse<ICow[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Successfully found cows",
        data: result.data,
        meta: result.meta,
    });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    const result = await service.updateCowService(id, body);

    sendResponse<ICow>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester updated successfully",
        data: result,
    });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await service.deleteCowService(id);
    sendResponse<ICow>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully deleted cow",
        data: result,
    });
});

const getSpecificCow = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await service.getSpecificCowService(id);
    sendResponse<ICow>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully found cow",
        data: result,
    });
});

export default { createCow, getAllCows, updateCow, deleteCow, getSpecificCow };
