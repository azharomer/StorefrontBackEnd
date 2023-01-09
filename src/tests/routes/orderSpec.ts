import { PoolClient } from 'pg';
import Client from '../../config/database';
import User from '../../utilities/types/user.type';
import supertest from 'supertest';
import app from '../..';

const request = supertest(app);

describe('1- test order Endpoint', () => {
  const user: User = {
    username: 'azhar omer',
    firstname: 'azhar',
    lastname: 'omer',
    email: 'azharomer880@gmail.com',
    password: 'admin123',
  } as User;

  let token: string = '';
  let product_id: number;
  let order_id: number;

  beforeAll(async () => {
    const res = await request
      .post('/api/auth/register')
      .set('Content-type', 'application/json')
      .send(user);
    token = res.body.data.token;
    user.id = res.body.data.id as number;
    const product_res = await request
      .post(`/api/products/`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        price: 100,
        category: 'a',
      });
    product_id = product_res.body.data.id as number;
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

  it('1- check create order endpoint ', async () => {
    const res = await request
      .post(`/api/orders/`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        products: [
          {
            product_id: product_id,
            quantity: 20,
          },
        ],
      });
    expect(res.status).toBe(200);
    order_id = res.body.data.id as number;
    console.log(order_id);
    expect(res.body.data.status).toBeFalse();
  });

  it('2- check get all user orders endpoint  ', async () => {
    const res = await request
      .get(`/api/orders/`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  it('3- check get  order details endpoint ', async () => {
    const res = await request
      .get(`/api/orders/${order_id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  it('4- check confirm  order  endpoint ', async () => {
    const res = await request
      .post(`/api/orders/${order_id}/confirm`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it('5- check  faild to delete  order  confirmed endpoint ', async () => {
    const res = await request
      .delete(`/api/orders/${order_id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(400);
  });

  it('6- check faild to add product already exist in order  endpoint ', async () => {
    const res = await request
      .post(`/api/orders/${order_id}/addproduct`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ product_id: 1, quantity: 10 });
    expect(res.status).toBe(400);
  });
});
