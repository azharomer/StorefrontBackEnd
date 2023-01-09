import { PoolClient } from 'pg';
import Client from '../config/database';
import Product from '../utilities/types/product.type';

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = 'SELECT id, name, category  FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`can't get products ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string =
        'SELECT id, name, category , price FROM products Where id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      const product: Product = result.rows[0];
      return product;
    } catch (err) {
      throw new Error(`couldn't find Product ${id}. error  ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string =
        'INSERT INTO products (name, category, price) values ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        product.name,
        product.category,
        product.price as number,
      ]);
      conn.release();
      const newProduct: Product = result.rows[0];
      return newProduct;
    } catch (err) {
      throw new Error(`couldn't create Product ${product.name}. error  ${err}`);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string =
        'UPDATE products SET name = $1, category = $2, price = $3 WHERE id=$4 RETURNING *';
      const result = await conn.query(sql, [
        product.name,
        product.category,
        product.price,
        product.id,
      ]);
      conn.release();
      const newProduct: Product = result.rows[0];
      return newProduct;
    } catch (err) {
      throw new Error(`couldn't udate Product ${product.name}. error  ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = 'DELETE FROM products Where id = ($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      const product: Product = result.rows[0];
      return product;
    } catch (err) {
      throw new Error(`couldn't delete Product ${id}. error  ${err}`);
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = `SELECT * FROM products WHERE category LIKE '%${category}%' `;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`can't get products ${err}`);
    }
  }

  async findProductById(product_id: number): Promise<Product | null> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = `SELECT products.* FROM products
            WHERE products.id = ${product_id}`;
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

  async checkCanDeleteProduct(product_id: number): Promise<boolean> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = `SELECT op.* FROM order_products as op
            JOIN orders ON order.id = op.order_id
            WHERE op.product_id = ${product_id} AND orders.status = true`;
      const result = await conn.query(sql);
      conn.release();

      if (result.rows.length) {
        return false;
      }
      return true;
    } catch (err) {
      return true;
    }
  }

  async getpopularProduct(): Promise<Product[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = `SELECT op.product_id, products.name, count(op.*) as total FROM order_products as op
            JOIN products ON products.id = op.product_id
            GROUP BY op.product_id , products.name ORDER BY total DESC LIMIT 5;
           `;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`can't get products ${err}`);
    }
  }
}
