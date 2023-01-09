"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../../controllers/orderController");
const middlewares_1 = __importDefault(require("../middlewares"));
const order_products_validation_rules_1 = __importDefault(require("../../utilities/validation/order_products/order_products.validation.rules"));
const order_validation_rules_1 = __importDefault(require("../../utilities/validation/order/order.validation.rules"));
const ordersRoute = express_1.default.Router();
ordersRoute
    .route('/')
    .get(orderController_1.index)
    .post(middlewares_1.default.validation(order_validation_rules_1.default.orderValidation), orderController_1.create);
ordersRoute.route('/completed').get(orderController_1.completed);
ordersRoute.route('/current').get(orderController_1.current);
ordersRoute
    .route('/:id')
    .get(middlewares_1.default.validateOrderId, orderController_1.show)
    .delete(middlewares_1.default.validateOrderId, middlewares_1.default.validateOrderCanEdit, orderController_1.deleteOrder);
ordersRoute
    .route('/:id/confirm')
    .post(middlewares_1.default.validateOrderId, middlewares_1.default.validateOrderCanEdit, orderController_1.confirmOrder);
ordersRoute
    .route('/:id/addproduct')
    .post(middlewares_1.default.validateOrderId, middlewares_1.default.validateOrderCanEdit, middlewares_1.default.validation(order_products_validation_rules_1.default.orderProductValidation), orderController_1.addProduct);
exports.default = ordersRoute;
