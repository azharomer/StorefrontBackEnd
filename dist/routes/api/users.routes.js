"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controllers/userController");
const middlewares_1 = __importDefault(require("../middlewares"));
const user_validation_rules_1 = __importDefault(require("../../utilities/validation/user/user.validation.rules"));
const userRoutes = express_1.default.Router();
// userRoutes.use(middlewares.verifyAuthToken);
userRoutes.route('/').get(userController_1.index);
userRoutes
    .route('/:id')
    .get(middlewares_1.default.validateUserId, userController_1.show)
    .patch(middlewares_1.default.validateUserId, middlewares_1.default.validation(user_validation_rules_1.default.userValidation), userController_1.update)
    .delete(middlewares_1.default.validateUserId, userController_1.deleteUser);
exports.default = userRoutes;
