"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler = (err, _req, res) => {
    const status = err.status || 500;
    const msg = err.message || 'someting wrong try again';
    res.status(status).json({ status, msg });
};
exports.default = ErrorHandler;
