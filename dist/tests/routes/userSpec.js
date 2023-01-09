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
describe('1- test User Endpoint ', () => {
    const user = {
        username: 'azhar omer',
        firstname: 'azhar',
        lastname: 'omer',
        email: 'azharomer880@gmail.com',
        password: 'admin123',
    };
    let token = '';
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
       `;
        yield conn.query(sql);
        conn.release();
    }));
    it('1- check index endpoint to get all users for Auth user ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get('/api/users/')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(1);
    }));
    it('2- check getuser By id endpoint get user info ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get(`/api/users/${user.id}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.email).toBe(user.email);
    }));
    it('3- check Update endpoint to update user info ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .patch(`/api/users/${user.id}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(Object.assign(Object.assign({}, user), { username: 'azhar' }));
        expect(res.status).toBe(200);
    }));
    it('4- check Delete endpoint to Delete user ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .delete(`/api/users/${user.id}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    }));
});
