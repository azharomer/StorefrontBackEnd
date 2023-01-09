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
const product_model_1 = require("../../models/product.model");
const order_model_1 = require("../../models/order.model");
const AuthStore = new auth_model_1.Auth();
const ProductModel = new product_model_1.ProductStore();
const OrderModel = new order_model_1.OrderStore();
describe('4- test Order Model', () => {
    describe('1- check defined methods in Order Model', () => {
        it('it should have index method to get all Orders', () => {
            expect(OrderModel.index).toBeDefined();
        });
        it('it should have show method to get Order data', () => {
            expect(OrderModel.show).toBeDefined();
        });
        it('it should have update method to Create  Order data', () => {
            expect(OrderModel.create).toBeDefined();
        });
        it('it should have delete method to delete Order', () => {
            expect(OrderModel.delete).toBeDefined();
        });
        it('it should have add product method to add one product to order', () => {
            expect(OrderModel.addProduct).toBeDefined();
        });
        it('it should have add confirm method to confirm order', () => {
            expect(OrderModel.confirmOrder).toBeDefined();
        });
        it('it should have check product exist in order method to check order product order', () => {
            expect(OrderModel.findOderProductById).toBeDefined();
        });
    });
    describe('2- Test Order Model Logic', () => {
        const user = {
            username: 'azhar omer',
            firstname: 'azhar',
            lastname: 'omer',
            email: 'azharomer880@gmail.com',
            password: 'admin123',
        };
        const product = {
            name: 'test',
            category: 'a',
            price: 100,
        };
        const productTwo = {
            name: 'B',
            category: 'a',
            price: 50,
        };
        const order = {
            status: false,
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const currentUser = yield AuthStore.register(user);
            user.id = currentUser.id;
            order.user_id = currentUser.id;
            const currentProduct = yield ProductModel.create(product);
            product.id = currentProduct.id;
            const currentProductTwo = yield ProductModel.create(productTwo);
            productTwo.id = currentProductTwo.id;
            const currentOrder = yield OrderModel.create(currentUser.id, [
                {
                    product_id: +product.id,
                    quantity: 10,
                },
            ]);
            order.id = currentOrder.id;
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
        it('create method return new order in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const new_order = yield OrderModel.create(user.id, [
                {
                    product_id: product.id,
                    quantity: 20,
                },
            ]);
            expect(new_order.id).toEqual(2);
        }));
        it('index method return all avalible user orders in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield OrderModel.index(user.id);
            expect(orders.length).toEqual(1);
        }));
        it('show method return order info in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const orderInfo = yield OrderModel.show(user.id, order.id);
            expect(orderInfo).toEqual({
                id: order.id,
                status: 'active',
                user: user.username,
                total_price: 1000,
                products: [
                    {
                        id: product.id,
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        quantity: 10,
                    },
                ],
            });
        }));
        it('add product to exist order method  in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const new_order = yield OrderModel.addProduct({
                product_id: productTwo.id,
                order_id: order.id,
                quantity: 20,
            });
            expect(new_order.id).toEqual(new_order.id);
            expect(new_order.quantity).toEqual(20);
        }));
        it('change order status to complete in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const orderD = yield OrderModel.confirmOrder(user.id, order.id);
            expect(orderD.status).toEqual('complete');
        }));
        it('Delete order  no 2 in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const orderDelete = yield OrderModel.delete(2, user.id);
            expect(orderDelete.status).toBeFalse();
        }));
    });
});
