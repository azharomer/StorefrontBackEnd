"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const product_model_1 = require("../../../models/product.model");
const isFoundProduct = (value) => {
    const product_id = parseInt(value);
    const Product = new product_model_1.ProductStore();
    return Product.findProductById(product_id).then(found => !found ? Promise.reject('Product Not Found') : null);
};
const isaddProductmoretime = (value, { req }) => {
    const product_id = parseInt(value);
    const found = req.body.products.filter((item) => item.product_id == product_id).length > 1;
    console.log(found, req.body.products);
    return found ? Promise.reject('Product already exist in list') : true;
};
const orderValidation = [
    (0, express_validator_1.body)('products')
        .isArray({ min: 1 })
        .withMessage('Products list required to ceate new order')
        .notEmpty()
        .withMessage('Products list  must have at least one product'),
    (0, express_validator_1.body)('products.*.product_id')
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
        .custom(isaddProductmoretime),
    (0, express_validator_1.body)('products.*.quantity')
        .trim()
        .notEmpty()
        .withMessage('quantity Required')
        .bail()
        .isInt({ min: 1 })
        .toInt()
        .withMessage('Product Price Required'),
];
exports.default = {
    orderValidation: orderValidation,
};
