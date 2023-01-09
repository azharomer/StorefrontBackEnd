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
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../config/database"));
const __1 = __importDefault(require("../.."));
const request = (0, supertest_1.default)(__1.default);
describe(' 1- Test Auth Endpoint', () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield database_1.default.connect();
        const sql = ` DELETE FROM users;
        ALTER  SEQUENCE users_id_seq RESTART WITH 1;
       `;
        yield conn.query(sql);
        conn.release();
    }));
    it(' 1- check register endpoint to create new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            username: 'azhar omar',
            firstname: 'azhar',
            lastname: 'omar',
            email: 'azharomer880@gmail.com',
            password: '123456',
        };
        const res = yield request
            .post('/api/auth/register')
            .set('Content-type', 'application/json')
            .send(user);
        expect(res.status).toBe(200);
    }));
    it(' 2- check fail register endpoint to create user with exist email', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            username: 'test omar',
            firstname: 'test',
            lastname: 'omar',
            email: 'azharomer880@gmail.com',
            password: '123456',
        };
        const res = yield request
            .post('/api/auth/register')
            .set('Content-type', 'application/json')
            .send(user);
        const email = res.body.data[0].email;
        expect(email).toBe('email already exist');
    }));
    it(' 3- check login endpoint with correct data', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/api/auth/login')
            .set('Content-type', 'application/json')
            .send({
            email: 'azharomer880@gmail.com',
            password: '123456',
        });
        expect(res.status).toBe(200);
    }));
    it(' 4- check login endpoint with wrong email', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/api/auth/login')
            .set('Content-type', 'application/json')
            .send({
            email: 'azharomer@gmail.com',
            password: '123456',
        });
        expect(res.status).toBe(401);
    }));
});
