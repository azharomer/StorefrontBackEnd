"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const user_model_1 = require("../../../models/user.model");
const isValidEmail = (value) => {
    const user = new user_model_1.UserModelStore();
    return user
        .findUserByEmail(value)
        .then(user => (user ? Promise.reject('email already exist') : null));
};
const loginRules = [
    (0, express_validator_1.body)('email')
        .trim()
        .notEmpty()
        .withMessage('email required')
        .bail()
        .isEmail()
        .normalizeEmail()
        .withMessage('invalid email formate'),
    (0, express_validator_1.body)('password').trim().notEmpty().withMessage('password required'),
];
const RegisterRules = [
    (0, express_validator_1.body)('email')
        .trim()
        .notEmpty()
        .withMessage('email required')
        .bail()
        .isEmail()
        .normalizeEmail()
        .withMessage('invalid email formate')
        .bail()
        .custom(isValidEmail),
    (0, express_validator_1.body)('username').trim().notEmpty().withMessage('username reqired'),
    (0, express_validator_1.body)('firstname').trim().notEmpty().withMessage('firstname reqired'),
    (0, express_validator_1.body)('lastname').trim().notEmpty().withMessage('lastname reqired'),
    (0, express_validator_1.body)('password').trim().notEmpty().withMessage('password Required'),
];
exports.default = {
    loginRules: loginRules,
    RegisterRules: RegisterRules,
};
