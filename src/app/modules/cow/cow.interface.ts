import mongoose from "mongoose";

export type ICow = {
    name: string;
    age: number;
    price: number;
    location:
        | "Dhaka"
        | "Chottogram"
        | "Barishal"
        | "Rajshahi"
        | "Sylhet"
        | "Comilla"
        | "Rangpur"
        | "Mymensingh";
    breed:
        | "Brahman"
        | "Nellore"
        | "Sahiwal"
        | "Gir"
        | "Indigenous"
        | "Tharparkar"
        | "Kankrej";
    weight: number;
    label: "for sale" | "sold out";
    category: "Dairy" | "Beef" | "Dual Purpose";
    seller: mongoose.Types.ObjectId;
};

export type CowModel = mongoose.Model<ICow, object>;
export type ICowFilters = {
    searchTerm?: string;
    breed?: string;
    label?: string;
    category?: string;
    location?: string;
    name?: string;
    maxPrice?: string;
    minPrice?: string;
};
