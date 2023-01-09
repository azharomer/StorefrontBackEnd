import { PoolClient } from 'pg';
import Client from '../../config/database';
import User from '../../utilities/types/user.type';
import supertest from 'supertest';
import app from '../..';

const request = supertest(app);

describe('1- test User Endpoint ', () => {
  const user: User = {
    username: 'azhar omer',
    firstname: 'azhar',
    lastname: 'omer',
    email: 'azharomer880@gmail.com',
    password: 'admin123',
  } as User;

  let token = '';

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
       `;
    await conn.query(sql);
    conn.release();
  });

  it('1- check index endpoint to get all users for Auth user ', async () => {
    const res = await request
      .get('/api/users/')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  it('2- check getuser By id endpoint get user info ', async () => {
    const res = await request
      .get(`/api/users/${user.id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe(user.email);
  });

  it('3- check Update endpoint to update user info ', async () => {
    const res = await request
      .patch(`/api/users/${user.id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...user, username: 'azhar' });
    expect(res.status).toBe(200);
  });

  it('4- check Delete endpoint to Delete user ', async () => {
    const res = await request
      .delete(`/api/users/${user.id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
