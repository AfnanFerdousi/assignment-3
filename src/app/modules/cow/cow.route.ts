import express from "express";
import controller from "./cow.controller";
import validateRequest from "../../middleware/validateRequest";
import { createCowZodSchema, updateCowZodSchema } from "./cow.validation";

const router = express.Router();

router.get("/", controller.getAllCows);
router.get("/:id", controller.getSpecificCow);
router.patch("/:id", validateRequest(updateCowZodSchema), controller.updateCow);
router.delete("/:id", controller.deleteCow);
router.post(
    "/",
    validateRequest(createCowZodSchema),
    controller.createCow
);

export default router;
