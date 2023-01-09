"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../../controllers/authController");
const auth_validation_rules_1 = __importDefault(require("../../utilities/validation/auth/auth.validation.rules"));
const middlewares_1 = __importDefault(require("../middlewares"));
const authRoutes = express_1.default.Router();
authRoutes
    .route('/register')
    .post(middlewares_1.default.validation(auth_validation_rules_1.default.RegisterRules), authController_1.register);
authRoutes
    .route('/login')
    .post(middlewares_1.default.validation(auth_validation_rules_1.default.loginRules), authController_1.login);
exports.default = authRoutes;
