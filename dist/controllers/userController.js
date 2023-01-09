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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.update = exports.show = exports.index = void 0;
const user_model_1 = require("../models/user.model");
const userStore = new user_model_1.UserModelStore();
// method get all users
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userStore.index();
        const result = {
            success: true,
            msg: 'get all users successfully',
            data: users,
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
exports.index = index;
// method get user Info by Id
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const user = yield userStore.show(id);
        const result = {
            success: true,
            msg: 'get user successfully',
            data: user,
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
exports.show = show;
// method update user data
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            email: req.body.email,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const editUser = yield userStore.update(user);
        const result = {
            success: true,
            msg: 'update user successfully',
            data: editUser,
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
exports.update = update;
// method delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const user = yield userStore.delete(id);
        const result = {
            success: true,
            msg: 'Delete user successfully',
            data: user,
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
exports.deleteUser = deleteUser;
