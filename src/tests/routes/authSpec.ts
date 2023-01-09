import supertest from 'supertest';
import Client from '../../config/database';
import { PoolClient } from 'pg';
import app from '../..';
import User from '../../utilities/types/user.type';

const request = supertest(app);

describe(' 1- Test Auth Endpoint', () => {
  afterAll(async () => {
    const conn: PoolClient = await Client.connect();
    const sql: string = ` DELETE FROM users;
        ALTER  SEQUENCE users_id_seq RESTART WITH 1;
       `;
    await conn.query(sql);
    conn.release();
  });

  it(' 1- check register endpoint to create new user', async () => {
    const user: User = {
      username: 'azhar omar',
      firstname: 'azhar',
      lastname: 'omar',
      email: 'azharomer880@gmail.com',
      password: '123456',
    } as User;
    const res = await request
      .post('/api/auth/register')
      .set('Content-type', 'application/json')
      .send(user);
    expect(res.status).toBe(200);
  });

  it(' 2- check fail register endpoint to create user with exist email', async () => {
    const user: User = {
      username: 'test omar',
      firstname: 'test',
      lastname: 'omar',
      email: 'azharomer880@gmail.com',
      password: '123456',
    } as User;
    const res = await request
      .post('/api/auth/register')
      .set('Content-type', 'application/json')
      .send(user);

    const email: string = res.body.data[0].email;
    expect(email).toBe('email already exist');
  });

  it(' 3- check login endpoint with correct data', async () => {
    const res = await request
      .post('/api/auth/login')
      .set('Content-type', 'application/json')
      .send({
        email: 'azharomer880@gmail.com',
        password: '123456',
      });
    expect(res.status).toBe(200);
  });

  it(' 4- check login endpoint with wrong email', async () => {
    const res = await request
      .post('/api/auth/login')
      .set('Content-type', 'application/json')
      .send({
        email: 'azharomer@gmail.com',
        password: '123456',
      });
    expect(res.status).toBe(401);
  });
});
