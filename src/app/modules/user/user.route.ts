import express from "express";
import controller from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";

const router = express.Router();

router.get("/users", controller.getAllUsers);
router.get("/users/:id", controller.getSingleUser);
router.patch(
    "/users/:id",
    validateRequest(updateUserZodSchema),
    controller.updateUser
);
router.delete("/users/:id", controller.deleteUser);
router.post(
    "/auth/signup",
    validateRequest(createUserZodSchema),
    controller.createUser
);

export default router;
