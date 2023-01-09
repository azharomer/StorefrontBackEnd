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
exports.popularProduct = exports.deleteProduct = exports.getProductsByCategory = exports.show = exports.update = exports.create = exports.index = void 0;
const product_model_1 = require("../models/product.model");
const Product = new product_model_1.ProductStore();
// method get all Product
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Products = yield Product.index();
        const result = {
            success: true,
            msg: 'get all Products successfully',
            data: Products,
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
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = yield Product.create(product);
        const result = {
            success: true,
            msg: 'create Product successfully',
            data: newProduct,
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
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            id: parseInt(req.params.id),
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = yield Product.update(product);
        const result = {
            success: true,
            msg: 'Update Product successfully',
            data: newProduct,
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
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = parseInt(req.params.id);
        const product = yield Product.show(product_id);
        const result = {
            success: true,
            msg: 'get  Product successfully',
            data: product,
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
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.category;
        const products = yield Product.getProductsByCategory(category);
        const result = {
            success: true,
            msg: 'get all  Products by category successfully',
            data: products,
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
exports.getProductsByCategory = getProductsByCategory;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = parseInt(req.params.id);
        const product = yield Product.delete(product_id);
        const result = {
            success: true,
            msg: 'Delete  Product successfully',
            data: product,
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
exports.deleteProduct = deleteProduct;
const popularProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Products = yield Product.getpopularProduct();
        const result = {
            success: true,
            msg: 'get top  popular Products successfully',
            data: Products,
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
exports.popularProduct = popularProduct;
