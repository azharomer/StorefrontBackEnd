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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = __importDefault(require("../config/app"));
const auth_model_1 = require("../models/auth.model");
const authModel = new auth_model_1.Auth();
// method create new user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            email: req.body.email,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const newUser = yield authModel.register(user);
        const token = jsonwebtoken_1.default.sign({ id: newUser.id }, app_1.default.token);
        const result = {
            success: true,
            msg: 'create user successfully',
            data: Object.assign(Object.assign({}, newUser), { token }),
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
exports.register = register;
// login method
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let result;
        const user = yield authModel.auth(email, password);
        if (user) {
            const userToken = jsonwebtoken_1.default.sign({ id: user.id }, app_1.default.token);
            result = {
                success: true,
                msg: 'login successfully',
                data: Object.assign(Object.assign({}, user), { userToken }),
            };
            res.status(200).json(result);
        }
        else {
            result = {
                success: false,
                msg: 'user email or password uncorrect try again',
            };
            res.status(401).json(result);
        }
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
exports.login = login;
