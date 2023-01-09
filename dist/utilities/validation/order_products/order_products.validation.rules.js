"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const order_model_1 = require("../../../models/order.model");
const product_model_1 = require("../../../models/product.model");
const isFoundProduct = (value) => {
    const product_id = parseInt(value);
    const Product = new product_model_1.ProductStore();
    return Product.findProductById(product_id).then(found => !found ? Promise.reject('Product Not Found') : null);
};
const isFoundProductInOrder = (value, { req }) => {
    var _a;
    const product_id = parseInt(value);
    const order_id = parseInt((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    const Order = new order_model_1.OrderStore();
    return Order.findOderProductById(order_id, product_id).then(found => found ? Promise.reject('Product already found in Order') : null);
};
const orderProductValidation = [
    (0, express_validator_1.body)('product_id')
        .trim()
        .notEmpty()
        .withMessage('Product ID Required')
        .bail()
        .isInt()
        .toInt()
        .withMessage('Product ID should be numeric')
        .bail()
        .custom(isFoundProduct)
        .bail()
        .custom(isFoundProductInOrder),
    (0, express_validator_1.body)('quantity')
        .trim()
        .notEmpty()
        .withMessage('quantity Required')
        .bail()
        .isInt()
        .toInt()
        .withMessage('Product quantity Required'),
];
exports.default = {
    orderProductValidation: orderProductValidation,
};
