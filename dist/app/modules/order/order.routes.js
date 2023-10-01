"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = __importDefault(require("./order.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const enums_1 = require("../../../enums/enums");
const router = express_1.default.Router();
router.post("/", order_controller_1.default.createOrder);
router.get("/", order_controller_1.default.getAllOrders);
router.get("/:id", (0, auth_1.default)(enums_1.ENUM_USER_ROLE.BUYER, enums_1.ENUM_USER_ROLE.SELLER), order_controller_1.default.getSpecificOrder);
exports.default = router;
