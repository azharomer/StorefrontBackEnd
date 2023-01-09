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
exports.UserModelStore = void 0;
const database_1 = __importDefault(require("../config/database"));
class UserModelStore {
    // index method
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT id, username, email  FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`can't get users ${err}`);
            }
        });
    }
    // show method
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE id = ($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                const user = result.rows[0];
                return user;
            }
            catch (err) {
                throw new Error(`couldn't find user ${id}. error  ${err}`);
            }
        });
    }
    // create method
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (username, email, password_digit) values ($1, $2, $3) RETURNING id, username, email';
                const result = yield conn.query(sql, [user.username, user.email, user.password_digit]);
                const new_user = result.rows[0];
                conn.release();
                return new_user;
            }
            catch (err) {
                throw new Error(`can't create users, error ${err}`);
            }
        });
    }
    // update method
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE users SET username=$1, email=$2 , password_digit=$3 WHERE id=$4 RETURNING id, username, email';
                const result = yield conn.query(sql, [user.username, user.email, user.password_digit, user.id]);
                const new_user = result.rows[0];
                conn.release();
                return new_user;
            }
            catch (err) {
                throw new Error(`can't update user , error ${err}`);
            }
        });
    }
    // delete method
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM users WHERE id = ($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                const user = result.rows[0];
                return user;
            }
            catch (err) {
                throw new Error(`couldn't delete user ${id}. error  ${err}`);
            }
        });
    }
    // auth method
    auth() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (_a) {
            }
        });
    }
}
exports.UserModelStore = UserModelStore;
