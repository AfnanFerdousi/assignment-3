import express from "express";
import orderController from "./order.controller";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/enums";

const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get(
    "/:id",
    auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
    orderController.getSpecificOrder
);

export default router;
