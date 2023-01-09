"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./api/auth.routes"));
const orders_routes_1 = __importDefault(require("./api/orders.routes"));
const products_routes_1 = __importDefault(require("./api/products.routes"));
const users_routes_1 = __importDefault(require("./api/users.routes"));
const middlewares_1 = __importDefault(require("./middlewares"));
const routes = express_1.default.Router();
routes.use('/auth', auth_routes_1.default);
routes.use('/users', middlewares_1.default.verifyAuthToken, users_routes_1.default);
routes.use('/orders', middlewares_1.default.verifyAuthToken, orders_routes_1.default);
routes.use('/products', products_routes_1.default);
routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'welcome to Store',
    });
});
routes.use(middlewares_1.default.ErrorHandler);
exports.default = routes;
