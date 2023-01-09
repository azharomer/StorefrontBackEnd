"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const user_model_1 = require("../../../models/user.model");
const isUniqeEmail = (value, { req }) => {
    const user = new user_model_1.UserModelStore();
    const user_id = parseInt(req.body.user_id);
    return user
        .checkEmailUniqe(user_id, value)
        .then(found => (!found ? Promise.reject('email already Used') : null));
};
const userValidation = [
    (0, express_validator_1.body)('email')
        .trim()
        .notEmpty()
        .withMessage('email required')
        .bail()
        .isEmail()
        .normalizeEmail()
        .withMessage('invalid email formate')
        .bail()
        .custom(isUniqeEmail),
    (0, express_validator_1.body)('username').trim().notEmpty().withMessage('username reqired'),
    (0, express_validator_1.body)('firstname').trim().notEmpty().withMessage('firstname reqired'),
    (0, express_validator_1.body)('lastname').trim().notEmpty().withMessage('lastname reqired'),
    (0, express_validator_1.body)('password').trim().notEmpty().withMessage('password Required'),
];
exports.default = {
    userValidation: userValidation,
};
