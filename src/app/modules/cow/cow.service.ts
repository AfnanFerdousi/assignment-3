import { SortOrder } from "mongoose";
import paginationHelpers from "../../../helpers/paginationHelper";
import IGenericResponse from "../../../interfaces/genericResponse";
import IPaginationOptions from "../../../interfaces/pagination";
import { cowSearchableFields } from "./cow.constant";
import { ICow, ICowFilters } from "./cow.interface";
import Cow from "./cow.model";

const createCowService = async (body: ICow): Promise<ICow | null> => {
    const result = await Cow.create(body);
    return result;
};

const getAllCowsService = async (
    paginationOptions: IPaginationOptions,
    filters: ICowFilters
): Promise<IGenericResponse<ICow[]>> => {
    const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers(paginationOptions);
    console.log(paginationOptions);
    const andConditions = [];

    if (minPrice !== undefined && maxPrice !== undefined) {
        andConditions.push({
            price: {
                $gte: minPrice,
                $lte: maxPrice,
            },
        });
    } else if (minPrice !== undefined) {
        andConditions.push({
            price: {
                $gte: minPrice,
            },
        });
    } else if (maxPrice !== undefined) {
        andConditions.push({
            price: {
                $lte: maxPrice,
            },
        });
    }

    if (searchTerm) {
        andConditions.push({
            $or: cowSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Cow.find(whereConditions)
        .populate("seller")
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Cow.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const updateCowService = async (
    _id: string,
    payload: Partial<ICow>
): Promise<ICow | null> => {
    const result = await Cow.findOneAndUpdate({ _id: _id }, payload, {
        new: true,
    });
    return result;
};

const deleteCowService = async (_id: string): Promise<ICow | null> => {
    const result = await Cow.findByIdAndDelete(_id);
    return result;
};

const getSpecificCowService = async (_id: string): Promise<ICow | null> => {
    const result = await Cow.findById(_id);
    return result;
};

export default {
    createCowService,
    getAllCowsService,
    updateCowService,
    deleteCowService,
    getSpecificCowService,
};
