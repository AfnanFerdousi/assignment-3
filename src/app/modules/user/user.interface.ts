import mongoose from "mongoose";

export type name = {
    firstName: string;
    lastName: string;
};

export type IUser = {
    phoneNumber: string;
    role: "seller" | "buyer";
    password: string;
    name: name;
    address: string;
    budget: number;
    income: number;
};

export type UserModel = mongoose.Model<IUser, object>;

export type IUserFilters = {
    searchTerm?: string;
    phoneNumber?: string;
    address?: string;
    role?: string;
};
