"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./user.controller"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.get("/users", user_controller_1.default.getAllUsers);
router.get("/users/:id", user_controller_1.default.getSingleUser);
router.patch("/users/:id", (0, validateRequest_1.default)(user_validation_1.updateUserZodSchema), user_controller_1.default.updateUser);
router.delete("/users/:id", user_controller_1.default.deleteUser);
router.post("/auth/signup", (0, validateRequest_1.default)(user_validation_1.createUserZodSchema), user_controller_1.default.createUser);
exports.default = router;
