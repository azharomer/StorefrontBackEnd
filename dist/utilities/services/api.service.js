"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (res, message) => {
    const result = {
        success: false,
        msg: message,
    };
    res.status(400).json(result);
};
exports.default = errorHandler;
