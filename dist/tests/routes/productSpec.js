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
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require("../.."));
const request = (0, supertest_1.default)(__1.default);
describe('1- test Product Endpoint ', () => {
    const user = {
        username: 'azhar omer',
        firstname: 'azhar',
        lastname: 'omer',
        email: 'azharomer880@gmail.com',
        password: 'admin123',
    };
    let token = '';
    let product_id;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/api/auth/register')
            .set('Content-type', 'application/json')
            .send(user);
        token = res.body.data.token;
        user.id = res.body.data.id;
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
    it('1- check create product endpoint ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post(`/api/products/`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
            name: 'test',
            price: 100,
            category: 'a',
        });
        expect(res.status).toBe(200);
        product_id = res.body.data.id;
        expect(res.body.data.name).toBe('test');
    }));
    it('2- check get all  products endpoint  ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get(`/api/products/`)
            .set('Content-type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(1);
    }));
    it('3- check get product data endpoint ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get(`/api/products/${product_id}`)
            .set('Content-type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body.data.name).toBe('test');
    }));
    it('4- check Update endpoint to update product ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .patch(`/api/products/${product_id}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
            name: 'test',
            price: 100,
            category: 'b',
        });
        expect(res.status).toBe(200);
        expect(res.body.data.category).toBe('b');
    }));
    it('5- check search endpoint to get products by category ', () => __awaiter(void 0, void 0, void 0, function* () {
        const search = 'b';
        const res = yield request
            .get(`/api/products/cat/${search}`)
            .set('Content-type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(1);
    }));
    it('6- check Delete endpoint to Delete Product ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .delete(`/api/products/${product_id}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    }));
});
