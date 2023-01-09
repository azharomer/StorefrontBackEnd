"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notFound_middleware_1 = __importDefault(require("./notFound.middleware"));
const errorHandler_middleware_1 = __importDefault(require("./errorHandler.middleware"));
const auth_middleware_1 = __importDefault(require("./auth.middleware"));
const validation_middleware_1 = __importDefault(require("./validation.middleware"));
const validateUserId_middleware_1 = __importDefault(require("./validateUserId.middleware"));
const validateOrderId_middleware_1 = __importDefault(require("./validateOrderId.middleware"));
const validateProductId_middleware_1 = __importDefault(require("./validateProductId.middleware"));
const canEditOrder_middleware_1 = __importDefault(require("./canEditOrder.middleware"));
const canDeleteProduct_middleware_1 = __importDefault(require("./canDeleteProduct.middleware"));
exports.default = {
    NotFound: notFound_middleware_1.default,
    ErrorHandler: errorHandler_middleware_1.default,
    verifyAuthToken: auth_middleware_1.default,
    validation: validation_middleware_1.default,
    validateUserId: validateUserId_middleware_1.default,
    validateOrderId: validateOrderId_middleware_1.default,
    validateProductId: validateProductId_middleware_1.default,
    validateOrderCanEdit: canEditOrder_middleware_1.default,
    validateCanDeleteProduct: canDeleteProduct_middleware_1.default,
};
