"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cowSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        enum: [
            "Dhaka",
            "Chottogram",
            "Barishal",
            "Rajshahi",
            "Sylhet",
            "Comilla",
            "Rangpur",
            "Mymensingh",
        ],
        required: true,
    },
    breed: {
        type: String,
        enum: [
            "Brahman",
            "Nellore",
            "Sahiwal",
            "Gir",
            "Indigenous",
            "Tharparkar",
            "Kankrej",
        ],
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: ["for sale", "sold out"],
        default: "for sale",
    },
    category: {
        type: String,
        required: true,
        enum: ["Dairy", "Beef", "Dual Purpose"],
    },
    seller: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true, versionKey: false });
const Cow = mongoose_1.default.model("Cow", cowSchema);
exports.default = Cow;
