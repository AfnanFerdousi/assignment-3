"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const cow_route_1 = __importDefault(require("../modules/cow/cow.route"));
const order_routes_1 = __importDefault(require("../modules/order/order.routes"));
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/",
        route: user_route_1.default,
    },
    {
        path: "/cows",
        route: cow_route_1.default,
    },
    {
        path: "/orders",
        route: order_routes_1.default,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
