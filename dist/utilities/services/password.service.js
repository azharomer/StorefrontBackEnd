"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = __importDefault(require("../../config/app"));
const createHash = (password) => {
    const hash = bcrypt_1.default.hashSync(password + app_1.default.papper, parseInt(app_1.default.Salt));
    return hash;
};
const checkPassword = (password, userPassword) => {
    const check = bcrypt_1.default.compareSync(password + app_1.default.papper, userPassword);
    return check;
};
exports.default = {
    createHash: createHash,
    checkPassword: checkPassword,
};
