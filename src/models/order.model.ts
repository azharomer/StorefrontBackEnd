import { PoolClient } from 'pg';
import Client from '../config/database';
import Order, { OrderDB } from '../utilities/types/order.type';
import OrderDetails from '../utilities/types/orderDetails.type';
import OrderProduct from '../utilities/types/orderProducts.type';
import { ProductDetails } from '../utilities/types/product.type';

export class OrderStore {
  async index(id: number): Promise<OrderDetails[]> {
    try {
      const conn: PoolClient = await Client.connect();

      const sql: string = `SELECT orders.id, users.username as user ,  products.id as product_id,
            CASE WHEN orders.status = false THEN 'Active' ELSE 'Complete' END AS status,
            products.name as product, products.category as category, products.price, OP.quantity
             FROM orders JOIN users ON orders.user_id = users.id
            JOIN order_products AS OP ON orders.id = OP.order_id 
            JOIN products ON products.id = OP.product_id
            WHERE user_id = ${id}`;
      const result = await conn.query(sql);
      conn.release();
      const data: OrderDetails[] = this.responseData(result.rows);
      return data;
    } catch (err) {
      console.log(err);
      throw new Error(`can't get Orders ${err}`);
    }
  }

  async show(user_id: number, order_id: number): Promise<OrderDetails> {
    try {
      const conn: PoolClient = await Client.connect();

      const sql: string = `SELECT orders.id, users.username as user , products.id as product_id,
            CASE WHEN orders.status = false THEN 'active' ELSE 'complete' END AS status,
            products.name as product, products.category as category, products.price, OP.quantity
             FROM orders JOIN users ON orders.user_id = users.id
            JOIN order_products AS OP ON orders.id = OP.order_id 
            JOIN products ON products.id = OP.product_id
            WHERE user_id = ${user_id} AND orders.id = ${order_id}`;
      const result = await conn.query(sql);
      conn.release();
      const details: OrderDetails[] = this.responseData(result.rows);
      return details[0];
    } catch (err) {
      throw new Error(`can't get order ${err}`);
    }
  }

  async create(user_id: number, products: OrderProduct[]) {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string =
        'INSERT INTO orders (status, user_id) values ($1, $2) RETURNING *';
      const result = await conn.query(sql, [false, user_id]);
      conn.release();
      const newOrder: Order = result.rows[0];
      if (result.rows.length) {
        products.forEach(async (product: OrderProduct) => {
          product.order_id = newOrder.id as unknown as number;
          await this.addProduct(product);
        });
      }
      return newOrder;
    } catch (err) {
      throw new Error(`couldn't create Order . error  ${err}`);
    }
  }

  async delete(order_id: number, user_id: number): Promise<Order> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string =
        'DELETE FROM orders WHERE id=$1 AND user_id = $2 AND status = false RETURNING *';
      const result = await conn.query(sql, [order_id, user_id]);
      conn.release();
      const order: Order = result.rows[0];
      return order;
    } catch (err) {
      throw new Error(
        `couldn't Delete Order confirem order ${order_id}. error  ${err}`
      );
    }
  }

  async findOrderById(
    user_id: number,
    order_id: number
  ): Promise<Order | null> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = `SELECT orders.* FROM orders
            WHERE user_id = ${user_id} AND orders.id = ${order_id}`;
      const result = await conn.query(sql);
      conn.release();
      if (result.rows) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(`can't find order ${err}`);
    }
  }

  async addProduct(data: OrderProduct): Promise<OrderProduct> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string =
        'INSERT INTO order_products (order_id, product_id, quantity) values ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        data.order_id as number,
        data.product_id as number,
        data.quantity,
      ]);
      conn.release();
      const orderProduct: OrderProduct = result.rows[0] as OrderProduct;
      return orderProduct;
    } catch (err) {
      throw new Error(`couldn't add product Order . error  ${err}`);
    }
  }

  async confirmOrder(user_id: number, order_id: number): Promise<OrderDetails> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string =
        'UPDATE orders SET status = $1 WHERE id=$2  AND user_id = $3 RETURNING *';
      const result = await conn.query(sql, [true, order_id, user_id]);
      conn.release();
      const details: OrderDetails = await this.show(user_id, result.rows[0].id);
      return details;
    } catch (err) {
      throw new Error(
        `couldn't udate confirem order ${order_id}. error  ${err}`
      );
    }
  }

  async findOderProductById(
    order_id: number,
    product_id: number
  ): Promise<OrderProduct | null> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = `SELECT * FROM order_products
            WHERE product_id = ${product_id} AND order_id = ${order_id}`;
      const result = await conn.query(sql);
      conn.release();
      if (result.rows.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  async completed(id: number): Promise<OrderDetails[]> {
    try {
      const conn: PoolClient = await Client.connect();

      const sql: string = `SELECT orders.id, users.username as user ,  products.id as product_id,
            CASE WHEN orders.status = false THEN 'Active' ELSE 'Complete' END AS status,
            products.name as product, products.category as category, products.price, OP.quantity
             FROM orders JOIN users ON orders.user_id = users.id
            JOIN order_products AS OP ON orders.id = OP.order_id 
            JOIN products ON products.id = OP.product_id
            WHERE user_id = ${id} AND orders.status = true `;
      const result = await conn.query(sql);
      conn.release();
      const data: OrderDetails[] = this.responseData(result.rows);
      return data;
    } catch (err) {
      console.log(err);
      throw new Error(`can't get Orders ${err}`);
    }
  }

  async currentOrder(id: number): Promise<OrderDetails> {
    try {
      const conn: PoolClient = await Client.connect();

      const sql: string = `SELECT orders.id, users.username as user ,  products.id as product_id,
            CASE WHEN orders.status = false THEN 'Active' ELSE 'Complete' END AS status,
            products.name as product, products.category as category, products.price, OP.quantity
             FROM orders JOIN users ON orders.user_id = users.id
            JOIN order_products AS OP ON orders.id = OP.order_id 
            JOIN products ON products.id = OP.product_id
            WHERE user_id = ${id} AND orders.status = false ORDER BY orders.id DESC LIMIT `;
      const result = await conn.query(sql);
      conn.release();
      const data: OrderDetails[] = this.responseData(result.rows);
      return data[0];
    } catch (err) {
      console.log(err);
      throw new Error(`can't get Orders ${err}`);
    }
  }

  private responseData(data: OrderDB[]): OrderDetails[] {
    const result: OrderDetails[] = [];
    data.forEach((order: OrderDB) => {
      const found: OrderDetails | undefined = result.find(
        (item: OrderDetails) => item.id === order.id
      );
      if (!found) {
        let total_price: number = 0;
        const products: OrderDB[] = data.filter(
          (item: OrderDB) => item.id === order.id
        );
        const productsDetails: ProductDetails[] = [];
        products.forEach((product: OrderDB) => {
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
