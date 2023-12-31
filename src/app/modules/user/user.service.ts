import { SortOrder } from "mongoose";
import paginationHelpers from "../../../helpers/paginationHelper";
import IPaginationOptions from "../../../interfaces/pagination";
import { userSearchableFields } from "./user.constant";
import { IUser, IUserFilters } from "./user.interface";
import User from "./user.model";
import IGenericResponse from "../../../interfaces/genericResponse";

const createUserService = async (body: IUser): Promise<IUser> => {
    const user = await User.create(body);
    return user;
};

const getAllUsersService = async (
    paginationOptions: IPaginationOptions,
    filters: IUserFilters
): Promise<IGenericResponse<IUser[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers(paginationOptions);

    const andConditions = [];
    console.log(searchTerm, filtersData);
    if (searchTerm) {
        andConditions.push({
            $or: userSearchableFields.map(field => ({
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

    const result = await User.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await User.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const getSpecificUserService = async (_id: string): Promise<IUser | null> => {
    const user = await User.findById(_id);
    return user;
};

const updateUserService = async (
    _id: string,
    body: Partial<IUser>
): Promise<IUser | null> => {
    const result = await User.findOneAndUpdate({ _id: _id }, body, {
        new: true,
    });
    return result;
};

const deleteUserService = async (_id: string): Promise<IUser | null> => {
    const result = await User.findByIdAndDelete(_id);
    return result;
};

export default {
    createUserService,
    getAllUsersService,
    getSpecificUserService,
    updateUserService,
    deleteUserService,
};
