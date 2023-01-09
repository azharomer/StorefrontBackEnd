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
const user_model_1 = require("../../models/user.model");
const auth_model_1 = require("../../models/auth.model");
const AuthStore = new auth_model_1.Auth();
const UserStore = new user_model_1.UserModelStore();
describe('2- test User Model', () => {
    describe('1- check defined methods in User Model', () => {
        it('it should have index method to get all users', () => {
            expect(UserStore.index).toBeDefined();
        });
        it('it should have show method to get  user info', () => {
            expect(UserStore.show).toBeDefined();
        });
        it('it should have update method to update current user data', () => {
            expect(UserStore.update).toBeDefined();
        });
        it('it should have delete method to delete user', () => {
            expect(UserStore.delete).toBeDefined();
        });
        it('it should have check email method to check user email is uniqe', () => {
            expect(UserStore.checkEmailUniqe).toBeDefined();
        });
        it('it should have findUserById method to check user exist', () => {
            expect(UserStore.findUserById).toBeDefined();
        });
    });
    describe('2- Test User Model Logic', () => {
        const user = {
            username: 'azhar omer',
            firstname: 'azhar',
            lastname: 'omer',
            email: 'azharomer880@gmail.com',
            password: 'admin123',
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
        it('index method return all avalible users in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const usersArr = yield UserStore.index();
            expect(usersArr.length).toEqual(1);
        }));
        it('show method return user info in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const userInfo = yield UserStore.show(user.id);
            expect(userInfo).toEqual({
                id: user.id,
                email: user.email,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
            });
        }));
        it('Update user method return user updated info in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const userInfo = yield UserStore.update(Object.assign(Object.assign({}, user), { lastname: 'omar', username: 'azhar Test' }));
            expect(userInfo).toEqual({
                id: user.id,
                email: user.email,
                username: 'azhar Test',
                firstname: user.firstname,
                lastname: 'omar',
            });
        }));
        it('check email uniqe  method return exist user with same email or not', () => __awaiter(void 0, void 0, void 0, function* () {
            const found = yield UserStore.findUserByEmail(user.email);
            expect(!found).toBeFalse();
        }));
        it('check email uniqe when update user method return boolean', () => __awaiter(void 0, void 0, void 0, function* () {
            const found = yield UserStore.checkEmailUniqe(user.id, user.email);
            expect(found).toBeTrue();
        }));
        it('Delete user method return userinfo', () => __awaiter(void 0, void 0, void 0, function* () {
            const userInfo = yield UserStore.delete(user.id);
            expect(userInfo).toEqual({
                id: user.id,
                email: user.email,
                username: 'azhar Test',
                firstname: user.firstname,
                lastname: 'omar',
            });
        }));
    });
});
