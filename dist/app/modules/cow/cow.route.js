"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cow_controller_1 = __importDefault(require("./cow.controller"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const cow_validation_1 = require("./cow.validation");
const router = express_1.default.Router();
router.get("/", cow_controller_1.default.getAllCows);
router.get("/:id", cow_controller_1.default.getSpecificCow);
router.patch("/:id", (0, validateRequest_1.default)(cow_validation_1.updateCowZodSchema), cow_controller_1.default.updateCow);
router.delete("/:id", cow_controller_1.default.deleteCow);
router.post("/", (0, validateRequest_1.default)(cow_validation_1.createCowZodSchema), cow_controller_1.default.createCow);
exports.default = router;
