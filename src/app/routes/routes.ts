import express from "express";
import userRouter from "../modules/user/user.route";
import cowRouter from "../modules/cow/cow.route";
import orderRouter from "../modules/order/order.routes";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/",
        route: userRouter,
    },
    {
        path: "/cows",
        route: cowRouter,
    },
    {
        path: "/orders",
        route: orderRouter,
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
