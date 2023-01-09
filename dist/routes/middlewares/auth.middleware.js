"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = __importDefault(require("../../config/app"));
const errorHandler = (next) => {
    const error = new Error(' Access denied, Please Login');
    error.status = 401;
    return next(error);
};
const verifyAuthToken = (req, _res, next) => {
    try {
        const authorizationHeader = req.headers
            .authorization;
        if (authorizationHeader) {
            const authArr = authorizationHeader.split(' ');
            const bearer = authArr[0].toLowerCase() === 'bearer' ? true : false;
            if (bearer && authArr[1]) {
                const decoded = jsonwebtoken_1.default.verify(authArr[1], app_1.default.token);
                if (decoded) {
                    const id = decoded.id;
                    req.body.user_id = id;
                    return next();
                }
            }
            errorHandler(next);
        }
        else {
            errorHandler(next);
        }
    }
    catch (err) {
        errorHandler(next);
    }
};
exports.default = verifyAuthToken;
