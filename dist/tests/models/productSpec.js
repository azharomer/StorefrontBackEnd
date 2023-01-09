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
const database_1 = __importDefault(require("../../config/database"));
const auth_model_1 = require("../../models/auth.model");
const product_model_1 = require("../../models/product.model");
const AuthStore = new auth_model_1.Auth();
const ProductModel = new product_model_1.ProductStore();
describe('3- test Product Model', () => {
    describe('1- check defined methods in Product Model', () => {
        it('it should have index method to get all Products', () => {
            expect(ProductModel.index).toBeDefined();
        });
        it('it should have show method to get product data', () => {
            expect(ProductModel.show).toBeDefined();
        });
        it('it should have create method to Create  product data', () => {
            expect(ProductModel.create).toBeDefined();
        });
        it('it should have update method to update  product data', () => {
            expect(ProductModel.update).toBeDefined();
        });
        it('it should have delete method to delete product', () => {
            expect(ProductModel.delete).toBeDefined();
        });
        it('it should have search by category method to get all products matches search category ', () => {
            expect(ProductModel.getProductsByCategory).toBeDefined();
        });
    });
    describe('2- Test Product Model Logic', () => {
        const user = {
            username: 'azhar omer',
            firstname: 'azhar',
            lastname: 'omer',
            email: 'azharomer880@gmail.com',
            password: 'admin123',
        };
        const product = {
            name: 'test',
            category: 'a',
            price: 100,
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const currentUser = yield AuthStore.register(user);
            user.id = currentUser.id;
            const currentProduct = yield ProductModel.create(product);
            product.id = currentProduct.id;
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = ` DELETE FROM users;
            ALTER  SEQUENCE users_id_seq RESTART WITH 1;
            DELETE FROM products;
            ALTER  SEQUENCE products_id_seq RESTART WITH 1;
           `;
            yield conn.query(sql);
            conn.release();
        }));
        it('create method return new product  in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const new_product = yield ProductModel.create({
                name: 'test',
                category: 'a',
                price: 100,
            });
            expect(new_product).toEqual({
                id: new_product.id,
                name: 'test',
                category: 'a',
                price: 100,
            });
        }));
        it('index method return all avalible products in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const products = yield ProductModel.index();
            expect(products.length).toEqual(2);
        }));
        it('show method return product info in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const productInfo = yield ProductModel.show(product.id);
            expect(productInfo).toEqual({
                id: product.id,
                name: 'test',
                category: 'a',
                price: 100,
            });
        }));
        it('Delete method return product delete in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const productInfo = yield ProductModel.delete(product.id);
            expect(productInfo).toEqual({
                id: product.id,
                name: 'test',
                category: 'a',
                price: 100,
            });
        }));
        it('search By Category method return products matches search category in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const products = yield ProductModel.getProductsByCategory(product.category);
            expect(products.length).toEqual(1);
        }));
    });
});
