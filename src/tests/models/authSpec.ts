import Client from '../../config/database';
import User from '../../utilities/types/user.type';
import { PoolClient } from 'pg';
import { Auth } from '../../models/auth.model';

const AuthStore: Auth = new Auth();

describe('1- test auth model ', () => {
  describe(' test method exists', () => {
    it('1- should have register method', () => {
      expect(AuthStore.register).toBeDefined();
    });
    it('2- should have auth method', () => {
      expect(AuthStore.auth).toBeDefined();
    });
  });
  describe('test auth logic', () => {
    const user: User = {
      email: 'azhar@gmail.com',
      username: 'azhar omer',
      firstname: 'azhar',
      lastname: 'omar',
      password: '123456',
    };

    beforeAll(async () => {
      const currentUser = await AuthStore.register(user);
      user.id = currentUser.id;
    });

    afterAll(async () => {
      const conn: PoolClient = await Client.connect();
      const sql: string = ` DELETE FROM users;
            ALTER  SEQUENCE users_id_seq RESTART WITH 1;
           `;
      await conn.query(sql);
      conn.release();
    });

    it('1-auth method should return auth user data', async () => {
      const authUser = await AuthStore.auth(user.email, user.password);
      expect(authUser?.email).toBe(user.email);
      expect(authUser?.username).toBe(user.username);
      expect(authUser?.firstname).toBe(user.firstname);
      expect(authUser?.lastname).toBe(user.lastname);
    });

    it('2-auth method should return null with wrong data', async () => {
      const authUser = await AuthStore.auth(user.email, '5555');
      expect(authUser).toBe(null);
    });

    it('3-register method should return new user data', async () => {
      const new_user = await AuthStore.register({
        email: 'test@gmail.com',
        username: 'test username',
        firstname: 'test',
        lastname: '1',
        password: '123',
      } as User);
      expect(new_user).toEqual({
        id: new_user.id,
        email: 'test@gmail.com',
        username: 'test username',
        firstname: 'test',
        lastname: '1',
      } as User);
    });
  });
});
