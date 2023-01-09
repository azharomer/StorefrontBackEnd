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
exports.Auth = void 0;
const database_1 = __importDefault(require("../config/database"));
const password_service_1 = __importDefault(require("../utilities/services/password.service"));
class Auth {
    // Register method
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (username, firstname, lastname, email, password) values ($1, $2, $3, $4, $5) RETURNING id, username, firstname, lastname, email';
                const hashPassword = password_service_1.default.createHash(user.password);
                const result = yield conn.query(sql, [
                    user.username,
                    user.firstname,
                    user.lastname,
                    user.email,
                    hashPassword,
                ]);
                const new_user = result.rows[0];
                conn.release();
                return new_user;
            }
            catch (err) {
                throw new Error(`couldn't create user ${user.username}, error ${err}`);
            }
        });
    }
    auth(email, auth_password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT password FROM users WHERE email = ($1)';
                const result = yield conn.query(sql, [email]);
                if (result.rows.length) {
                    const { password } = result.rows[0];
                    const check = password_service_1.default.checkPassword(auth_password, password);
                    if (check) {
                        const userData = yield conn.query('SELECT id, email, username, firstname, lastname FROM users WHERE email = ($1)', [email]);
                        conn.release();
                        return userData.rows[0];
                    }
                }
                conn.release();
                return null;
            }
            catch (err) {
                console.log(err);
                const error = err;
                throw new Error(`couldn't login with error:  ${error.message}`);
            }
        });
    }
}
exports.Auth = Auth;
