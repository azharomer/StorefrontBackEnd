"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const app_1 = __importDefault(require("./app"));
const Client = new pg_1.Pool({
    host: app_1.default.DB_Host,
    port: parseInt(app_1.default.DB_Port, 10),
    database: app_1.default.DB_Name,
    user: app_1.default.DB_User,
    password: app_1.default.DB_Pass,
});
exports.default = Client;
