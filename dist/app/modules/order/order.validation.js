"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderValidation = void 0;
const zod_1 = require("zod");
exports.createOrderValidation = zod_1.z.object({
    buyerId: zod_1.z.string({
        required_error: "Buyer ID is required",
    }),
    cowId: zod_1.z.string({
        required_error: "Cow ID is required",
    }),
});
