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
describe('1- test order Endpoint', () => {
    const user = {
        username: 'azhar omer',
        firstname: 'azhar',
        lastname: 'omer',
        email: 'azharomer880@gmail.com',
        password: 'admin123',
    };
    let token = '';
    let product_id;
    let order_id;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/api/auth/register')
            .set('Content-type', 'application/json')
            .send(user);
        token = res.body.data.token;
        user.id = res.body.data.id;
        const product_res = yield request
            .post(`/api/products/`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
            name: 'test',
            price: 100,
            category: 'a',
        });
        product_id = product_res.body.data.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield database_1.default.connect();
        const sql = ` DELETE FROM users;
        ALTER  SEQUENCE users_id_seq RESTART WITH 1;
        DELETE FROM products;
        ALTER  SEQUENCE products_id_seq RESTART WITH 1;
        DELETE FROM orders;
        ALTER  SEQUENCE orders_id_seq RESTART WITH 1;
        DELETE FROM order_products;
        ALTER  SEQUENCE order_products_id_seq RESTART WITH 1;
       `;
        yield conn.query(sql);
        conn.release();
    }));
    it('1- check create order endpoint ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post(`/api/orders/`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
            products: [
                {
                    product_id: product_id,
                    quantity: 20,
                },
            ],
        });
        expect(res.status).toBe(200);
        order_id = res.body.data.id;
        console.log(order_id);
        expect(res.body.data.status).toBeFalse();
    }));
    it('2- check get all user orders endpoint  ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get(`/api/orders/`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(1);
    }));
    it('3- check get  order details endpoint ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get(`/api/orders/${order_id}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.id).toBe(1);
    }));
    it('4- check confirm  order  endpoint ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post(`/api/orders/${order_id}/confirm`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    }));
    it('5- check  faild to delete  order  confirmed endpoint ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .delete(`/api/orders/${order_id}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(400);
    }));
    it('6- check faild to add product already exist in order  endpoint ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post(`/api/orders/${order_id}/addproduct`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({ product_id: 1, quantity: 10 });
        expect(res.status).toBe(400);
    }));
});
