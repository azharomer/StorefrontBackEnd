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
const AuthStore = new auth_model_1.Auth();
describe('1- test auth model ', () => {
    describe(' test method exists', () => {
        it('1- should have register method', () => {
            expect(AuthStore.register).toBeDefined();
        });
        it('2- should have auth method', () => {
            expect(AuthStore.auth).toBeDefined();
        });
    });
    describe('test auth logic', () => {
        const user = {
            email: 'azhar@gmail.com',
            username: 'azhar omer',
            firstname: 'azhar',
            lastname: 'omar',
            password: '123456',
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const currentUser = yield AuthStore.register(user);
            user.id = currentUser.id;
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = ` DELETE FROM users;
            ALTER  SEQUENCE users_id_seq RESTART WITH 1;
           `;
            yield conn.query(sql);
            conn.release();
        }));
        it('1-auth method should return auth user data', () => __awaiter(void 0, void 0, void 0, function* () {
            const authUser = yield AuthStore.auth(user.email, user.password);
            expect(authUser === null || authUser === void 0 ? void 0 : authUser.email).toBe(user.email);
            expect(authUser === null || authUser === void 0 ? void 0 : authUser.username).toBe(user.username);
            expect(authUser === null || authUser === void 0 ? void 0 : authUser.firstname).toBe(user.firstname);
            expect(authUser === null || authUser === void 0 ? void 0 : authUser.lastname).toBe(user.lastname);
        }));
        it('2-auth method should return null with wrong data', () => __awaiter(void 0, void 0, void 0, function* () {
            const authUser = yield AuthStore.auth(user.email, '5555');
            expect(authUser).toBe(null);
        }));
        it('3-register method should return new user data', () => __awaiter(void 0, void 0, void 0, function* () {
            const new_user = yield AuthStore.register({
                email: 'test@gmail.com',
                username: 'test username',
                firstname: 'test',
                lastname: '1',
                password: '123',
            });
            expect(new_user).toEqual({
                id: new_user.id,
                email: 'test@gmail.com',
                username: 'test username',
                firstname: 'test',
                lastname: '1',
            });
        }));
    });
});
