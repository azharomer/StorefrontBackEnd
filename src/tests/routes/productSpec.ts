import { PoolClient } from 'pg';
import Client from '../../config/database';
import User from '../../utilities/types/user.type';
import supertest from 'supertest';
import app from '../..';

const request = supertest(app);

describe('1- test Product Endpoint ', () => {
  const user: User = {
    username: 'azhar omer',
    firstname: 'azhar',
    lastname: 'omer',
    email: 'azharomer880@gmail.com',
    password: 'admin123',
  } as User;

  let token: string = '';
  let product_id: number;

  beforeAll(async () => {
    const res = await request
      .post('/api/auth/register')
      .set('Content-type', 'application/json')
      .send(user);
    token = res.body.data.token;
    user.id = res.body.data.id as number;
  });

  afterAll(async () => {
    const conn: PoolClient = await Client.connect();
    const sql: string = ` DELETE FROM users;
        ALTER  SEQUENCE users_id_seq RESTART WITH 1;
        DELETE FROM products;
        ALTER  SEQUENCE products_id_seq RESTART WITH 1;
       `;
    await conn.query(sql);
    conn.release();
  });

  it('1- check create product endpoint ', async () => {
    const res = await request
      .post(`/api/products/`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        price: 100,
        category: 'a',
      });
    expect(res.status).toBe(200);
    product_id = res.body.data.id as number;
    expect(res.body.data.name).toBe('test');
  });

  it('2- check get all  products endpoint  ', async () => {
    const res = await request
      .get(`/api/products/`)
      .set('Content-type', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  it('3- check get product data endpoint ', async () => {
    const res = await request
      .get(`/api/products/${product_id}`)
      .set('Content-type', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('test');
  });

  it('4- check Update endpoint to update product ', async () => {
    const res = await request
      .patch(`/api/products/${product_id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        price: 100,
        category: 'b',
      });
    expect(res.status).toBe(200);
    expect(res.body.data.category).toBe('b');
  });

  it('5- check search endpoint to get products by category ', async () => {
    const search: string = 'b';
    const res = await request
      .get(`/api/products/cat/${search}`)
      .set('Content-type', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  it('6- check Delete endpoint to Delete Product ', async () => {
    const res = await request
      .delete(`/api/products/${product_id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
