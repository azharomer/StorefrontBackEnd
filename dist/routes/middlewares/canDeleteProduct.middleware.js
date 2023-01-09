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
const api_service_1 = __importDefault(require("../../utilities/services/api.service"));
const product_model_1 = require("../../models/product.model");
const validateCanDeleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id } = req.params;
        const Product = new product_model_1.ProductStore();
        const found = yield Product.checkCanDeleteProduct(parseInt(product_id));
        !found
            ? (0, api_service_1.default)(res, 'could not delete Product because it found in confirmed  Order ')
            : next();
    }
    catch (err) {
        (0, api_service_1.default)(res, 'could not delete Product because it found in confirmed  Order');
    }
});
exports.default = validateCanDeleteProduct;
