"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmOrder = exports.addProduct = exports.deleteOrder = exports.create = exports.show = exports.current = exports.completed = exports.index = void 0;
const order_model_1 = require("../models/order.model");
const Order = new order_model_1.OrderStore();
// method get all Orders
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(req.body.user_id);
        const orders = yield Order.index(user_id);
        const result = {
            success: true,
            msg: 'get all orders successfully',
            data: orders,
        };
        res.status(200).json(result);
    }
    catch (err) {
        const error = err;
        const result = {
            success: false,
            msg: error.message,
        };
        const status = error.status ? error.status : 400;
        res.status(status).json(result);
    }
});
exports.index = index;
const completed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(req.body.user_id);
        const orders = yield Order.completed(user_id);
        const result = {
            success: true,
            msg: 'get all completed orders successfully',
            data: orders,
        };
        res.status(200).json(result);
    }
    catch (err) {
        const error = err;
        const result = {
            success: false,
            msg: error.message,
        };
        const status = error.status ? error.status : 400;
        res.status(status).json(result);
    }
});
exports.completed = completed;
const current = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(req.body.user_id);
        const order = yield Order.currentOrder(user_id);
        const result = {
            success: true,
            msg: 'get current order successfully',
            data: order,
        };
        res.status(200).json(result);
    }
    catch (err) {
        const error = err;
        const result = {
            success: false,
            msg: error.message,
        };
        const status = error.status ? error.status : 400;
        res.status(status).json(result);
    }
});
exports.current = current;
// method get  Order details
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(req.body.user_id);
        const order_id = parseInt(req.params.id);
        const order = yield Order.show(user_id, order_id);
        const result = {
            success: true,
            msg: 'get order details successfully',
            data: order,
        };
        res.status(200).json(result);
    }
    catch (err) {
        const error = err;
        const result = {
            success: false,
            msg: error.message,
        };
        const status = error.status ? error.status : 400;
        res.status(status).json(result);
    }
});
exports.show = show;
// method create  Order  with products list
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = parseInt(req.body.user_id);
        const products = (_a = req.body.products) === null || _a === void 0 ? void 0 : _a.map((product) => {
            return {
                product_id: product.product_id,
                quantity: product.quantity,
            };
        });
        const newOrder = yield Order.create(user_id, products);
        const result = {
            success: true,
            msg: 'create Order successfully',
            data: newOrder,
        };
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        const error = err;
        const result = {
            success: false,
            msg: error.message,
        };
        const status = error.status ? error.status : 400;
        res.status(status).json(result);
    }
});
exports.create = create;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(req.body.user_id);
        const order_id = parseInt(req.params.id);
        const order = yield Order.delete(order_id, user_id);
        const result = {
            success: true,
            msg: 'Delete order successfully',
            data: order,
        };
        res.status(200).json(result);
    }
    catch (err) {
        const error = err;
        const result = {
            success: false,
            msg: error.message,
        };
        const status = error.status ? error.status : 400;
        res.status(status).json(result);
    }
});
exports.deleteOrder = deleteOrder;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            order_id: parseInt(req.params.id),
            product_id: parseInt(req.body.product_id),
            quantity: parseInt(req.body.quantity),
        };
        const newProduct = yield Order.addProduct(product);
        const result = {
            success: true,
            msg: 'add product to current order successfully',
            data: newProduct,
        };
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        const error = err;
        const result = {
            success: false,
            msg: error.message,
        };
        const status = error.status ? error.status : 400;
        res.status(status).json(result);
    }
});
exports.addProduct = addProduct;
const confirmOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = parseInt(req.body.user_id);
        const order_id = parseInt(req.params.id);
        const order = yield Order.confirmOrder(user_id, order_id);
        const result = {
            success: true,
            msg: 'Confirme order data successfully',
            data: order,
        };
        res.status(200).json(result);
    }
    catch (err) {
        const error = err;
        const result = {
            success: false,
            msg: error.message,
        };
        const status = error.status ? error.status : 400;
        res.status(status).json(result);
    }
});
exports.confirmOrder = confirmOrder;
