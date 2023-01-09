"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const productValidation = [
    (0, express_validator_1.body)('name')
        .trim()
        .notEmpty()
        .withMessage(' Product Name required')
        .bail()
        .isString()
        .withMessage(' Product Name should be letters'),
    (0, express_validator_1.body)('category')
        .trim()
        .notEmpty()
        .withMessage(' Product Category required')
        .bail()
        .isString()
        .withMessage('Product Category should be letters'),
    (0, express_validator_1.body)('price')
        .trim()
        .notEmpty()
        .withMessage('Product Price Required')
        .bail()
        .isInt({ min: 1 })
        .withMessage('Product Price should be number'),
];
exports.default = {
    ProductValidation: productValidation,
};
