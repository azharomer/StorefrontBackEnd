"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../../controllers/productController");
const middlewares_1 = __importDefault(require("../middlewares"));
const product_validation_rules_1 = __importDefault(require("../../utilities/validation/product/product.validation.rules"));
const producsRoute = express_1.default.Router();
producsRoute
    .route('/')
    .get(productController_1.index)
    .post(middlewares_1.default.verifyAuthToken, middlewares_1.default.validation(product_validation_rules_1.default.ProductValidation), productController_1.create);
producsRoute.route('/top').get(productController_1.popularProduct);
producsRoute
    .route('/:id')
    .get(middlewares_1.default.validateProductId, productController_1.show)
    .patch(middlewares_1.default.verifyAuthToken, middlewares_1.default.validateProductId, middlewares_1.default.validation(product_validation_rules_1.default.ProductValidation), productController_1.update)
    .delete(middlewares_1.default.validateProductId, middlewares_1.default.validateCanDeleteProduct, productController_1.deleteProduct);
producsRoute.route('/cat/:category').get(productController_1.getProductsByCategory);
exports.default = producsRoute;
