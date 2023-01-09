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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../config/database"));
class OrderStore {
    index(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT orders.id, users.username as user ,  products.id as product_id,
            CASE WHEN orders.status = false THEN 'Active' ELSE 'Complete' END AS status,
            products.name as product, products.category as category, products.price, OP.quantity
             FROM orders JOIN users ON orders.user_id = users.id
            JOIN order_products AS OP ON orders.id = OP.order_id 
            JOIN products ON products.id = OP.product_id
            WHERE user_id = ${id}`;
                const result = yield conn.query(sql);
                conn.release();
                const data = this.responseData(result.rows);
                return data;
            }
            catch (err) {
                console.log(err);
                throw new Error(`can't get Orders ${err}`);
            }
        });
    }
    show(user_id, order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT orders.id, users.username as user , products.id as product_id,
            CASE WHEN orders.status = false THEN 'active' ELSE 'complete' END AS status,
            products.name as product, products.category as category, products.price, OP.quantity
             FROM orders JOIN users ON orders.user_id = users.id
            JOIN order_products AS OP ON orders.id = OP.order_id 
            JOIN products ON products.id = OP.product_id
            WHERE user_id = ${user_id} AND orders.id = ${order_id}`;
                const result = yield conn.query(sql);
                conn.release();
                const details = this.responseData(result.rows);
                return details[0];
            }
            catch (err) {
                throw new Error(`can't get order ${err}`);
            }
        });
    }
    create(user_id, products) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (status, user_id) values ($1, $2) RETURNING *';
                const result = yield conn.query(sql, [false, user_id]);
                conn.release();
                const newOrder = result.rows[0];
                if (result.rows.length) {
                    products.forEach((product) => __awaiter(this, void 0, void 0, function* () {
                        product.order_id = newOrder.id;
                        yield this.addProduct(product);
                    }));
                }
                return newOrder;
            }
            catch (err) {
                throw new Error(`couldn't create Order . error  ${err}`);
            }
        });
    }
    delete(order_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM orders WHERE id=$1 AND user_id = $2 AND status = false RETURNING *';
                const result = yield conn.query(sql, [order_id, user_id]);
                conn.release();
                const order = result.rows[0];
                return order;
            }
            catch (err) {
                throw new Error(`couldn't Delete Order confirem order ${order_id}. error  ${err}`);
            }
        });
    }
    findOrderById(user_id, order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT orders.* FROM orders
            WHERE user_id = ${user_id} AND orders.id = ${order_id}`;
                const result = yield conn.query(sql);
                conn.release();
                if (result.rows) {
                    return result.rows[0];
                }
                return null;
            }
            catch (err) {
                throw new Error(`can't find order ${err}`);
            }
        });
    }
    addProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO order_products (order_id, product_id, quantity) values ($1, $2, $3) RETURNING *';
                const result = yield conn.query(sql, [
                    data.order_id,
                    data.product_id,
                    data.quantity,
                ]);
                conn.release();
                const orderProduct = result.rows[0];
                return orderProduct;
            }
            catch (err) {
                throw new Error(`couldn't add product Order . error  ${err}`);
            }
        });
    }
    confirmOrder(user_id, order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE orders SET status = $1 WHERE id=$2  AND user_id = $3 RETURNING *';
                const result = yield conn.query(sql, [true, order_id, user_id]);
                conn.release();
                const details = yield this.show(user_id, result.rows[0].id);
                return details;
            }
            catch (err) {
                throw new Error(`couldn't udate confirem order ${order_id}. error  ${err}`);
            }
        });
    }
    findOderProductById(order_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM order_products
            WHERE product_id = ${product_id} AND order_id = ${order_id}`;
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
    completed(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT orders.id, users.username as user ,  products.id as product_id,
            CASE WHEN orders.status = false THEN 'Active' ELSE 'Complete' END AS status,
            products.name as product, products.category as category, products.price, OP.quantity
             FROM orders JOIN users ON orders.user_id = users.id
            JOIN order_products AS OP ON orders.id = OP.order_id 
            JOIN products ON products.id = OP.product_id
            WHERE user_id = ${id} AND orders.status = true `;
                const result = yield conn.query(sql);
                conn.release();
                const data = this.responseData(result.rows);
                return data;
            }
            catch (err) {
                console.log(err);
                throw new Error(`can't get Orders ${err}`);
            }
        });
    }
    currentOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT orders.id, users.username as user ,  products.id as product_id,
            CASE WHEN orders.status = false THEN 'Active' ELSE 'Complete' END AS status,
            products.name as product, products.category as category, products.price, OP.quantity
             FROM orders JOIN users ON orders.user_id = users.id
            JOIN order_products AS OP ON orders.id = OP.order_id 
            JOIN products ON products.id = OP.product_id
            WHERE user_id = ${id} AND orders.status = false ORDER BY orders.id DESC LIMIT `;
                const result = yield conn.query(sql);
                conn.release();
                const data = this.responseData(result.rows);
                return data[0];
            }
            catch (err) {
                console.log(err);
                throw new Error(`can't get Orders ${err}`);
            }
        });
    }
    responseData(data) {
        const result = [];
        data.forEach((order) => {
            const found = result.find((item) => item.id === order.id);
            if (!found) {
                let total_price = 0;
                const products = data.filter((item) => item.id === order.id);
                const productsDetails = [];
                products.forEach((product) => {
                    productsDetails.push({
                        id: product.product_id,
                        name: product.product,
                        category: product.category,
                        price: product.price,
                        quantity: product.quantity,
                    });
                    total_price += product.price * product.quantity;
                });
                result.push({
                    id: order.id,
                    user: order.user,
                    status: order.status,
                    total_price: total_price,
                    products: productsDetails,
                });
            }
        });
        return result;
    }
}
exports.OrderStore = OrderStore;
