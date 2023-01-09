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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../config/database"));
class ProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT id, name, category  FROM products';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`can't get products ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT id, name, category , price FROM products Where id = ($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                const product = result.rows[0];
                return product;
            }
            catch (err) {
                throw new Error(`couldn't find Product ${id}. error  ${err}`);
            }
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO products (name, category, price) values ($1, $2, $3) RETURNING *';
                const result = yield conn.query(sql, [
                    product.name,
                    product.category,
                    product.price,
                ]);
                conn.release();
                const newProduct = result.rows[0];
                return newProduct;
            }
            catch (err) {
                throw new Error(`couldn't create Product ${product.name}. error  ${err}`);
            }
        });
    }
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE products SET name = $1, category = $2, price = $3 WHERE id=$4 RETURNING *';
                const result = yield conn.query(sql, [
                    product.name,
                    product.category,
                    product.price,
                    product.id,
                ]);
                conn.release();
                const newProduct = result.rows[0];
                return newProduct;
            }
            catch (err) {
                throw new Error(`couldn't udate Product ${product.name}. error  ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM products Where id = ($1) RETURNING *';
                const result = yield conn.query(sql, [id]);
                conn.release();
                const product = result.rows[0];
                return product;
            }
            catch (err) {
                throw new Error(`couldn't delete Product ${id}. error  ${err}`);
            }
        });
    }
    getProductsByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM products WHERE category LIKE '%${category}%' `;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`can't get products ${err}`);
            }
        });
    }
    findProductById(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT products.* FROM products
            WHERE products.id = ${product_id}`;
                const result = yield conn.query(sql);
                conn.release();
                if (result.rows.length) {
                    return result.rows[0];
                }
                return null;
            }
            catch (err) {
                return null;
            }
        });
    }
    checkCanDeleteProduct(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT op.* FROM order_products as op
            JOIN orders ON order.id = op.order_id
            WHERE op.product_id = ${product_id} AND orders.status = true`;
                const result = yield conn.query(sql);
                conn.release();
                if (result.rows.length) {
                    return false;
                }
                return true;
            }
            catch (err) {
                return true;
            }
        });
    }
    getpopularProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT op.product_id, products.name, count(op.*) as total FROM order_products as op
            JOIN products ON products.id = op.product_id
            GROUP BY op.product_id , products.name ORDER BY total DESC LIMIT 5;
           `;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`can't get products ${err}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
