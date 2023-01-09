import Client from '../../config/database';
import User from '../../utilities/types/user.type';
import { PoolClient } from 'pg';
import { Auth } from '../../models/auth.model';
import { ProductStore } from '../../models/product.model';
import Product, { ProductDetails } from '../../utilities/types/product.type';
import { OrderStore } from '../../models/order.model';
import Order from '../../utilities/types/order.type';
import OrderProduct from '../../utilities/types/orderProducts.type';
import OrderDetails from '../../utilities/types/orderDetails.type';

const AuthStore: Auth = new Auth();

const ProductModel: ProductStore = new ProductStore();

const OrderModel: OrderStore = new OrderStore();

describe('4- test Order Model', (): void => {
  describe('1- check defined methods in Order Model', (): void => {
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
  describe('2- Test Order Model Logic', (): void => {
    const user: User = {
      username: 'azhar omer',
      firstname: 'azhar',
      lastname: 'omer',
      email: 'azharomer880@gmail.com',
      password: 'admin123',
    } as User;

    const product: Product = {
      name: 'test',
      category: 'a',
      price: 100,
    } as Product;

    const productTwo: Product = {
      name: 'B',
      category: 'a',
      price: 50,
    } as Product;
    const order: Order = {
      status: false,
    } as Order;

    beforeAll(async () => {
      const currentUser = await AuthStore.register(user);
      user.id = currentUser.id as number;
      order.user_id = currentUser.id as unknown as number;

      const currentProduct = await ProductModel.create(product);
      product.id = currentProduct.id as unknown as number;
      const currentProductTwo = await ProductModel.create(productTwo);
      productTwo.id = currentProductTwo.id as unknown as number;

      const currentOrder = await OrderModel.create(currentUser.id as number, [
        {
          product_id: +product.id as number,
          quantity: 10,
        } as OrderProduct,
      ]);
      order.id = currentOrder.id as unknown as number;
    });

    afterAll(async () => {
      const conn: PoolClient = await Client.connect();
      const sql: string = ` DELETE FROM users;
            ALTER  SEQUENCE users_id_seq RESTART WITH 1;
            DELETE FROM products;
            ALTER  SEQUENCE products_id_seq RESTART WITH 1;
            DELETE FROM orders;
            ALTER  SEQUENCE orders_id_seq RESTART WITH 1;
            DELETE FROM order_products;
            ALTER  SEQUENCE order_products_id_seq RESTART WITH 1;
           `;
      await conn.query(sql);
      conn.release();
    });

    it('create method return new order in DB', async () => {
      const new_order = await OrderModel.create(user.id as number, [
        {
          product_id: product.id as number,
          quantity: 20,
        } as OrderProduct,
      ]);
      expect(new_order.id).toEqual(2);
    });

    it('index method return all avalible user orders in DB', async () => {
      const orders: OrderDetails[] = await OrderModel.index(user.id as number);
      expect(orders.length).toEqual(1);
    });

    it('show method return order info in DB', async () => {
      const orderInfo: OrderDetails = await OrderModel.show(
        user.id as number,
        order.id as number
      );
      expect(orderInfo).toEqual({
        id: order.id as number,
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
          } as ProductDetails,
        ],
      } as OrderDetails);
    });

    it('add product to exist order method  in DB', async () => {
      const new_order: OrderProduct = await OrderModel.addProduct({
        product_id: productTwo.id as number,
        order_id: order.id as number,
        quantity: 20,
      } as OrderProduct);
      expect(new_order.id).toEqual(new_order.id);
      expect(new_order.quantity).toEqual(20);
    });

    it('change order status to complete in DB', async () => {
      const orderD: OrderDetails = await OrderModel.confirmOrder(
        user.id as number,
        order.id as number
      );
      expect(orderD.status).toEqual('complete');
    });

    it('Delete order  no 2 in DB', async () => {
      const orderDelete: Order = await OrderModel.delete(2, user.id as number);
      expect(orderDelete.status).toBeFalse();
    });
  });
});
