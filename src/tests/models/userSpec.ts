import Client from '../../config/database';
import User from '../../utilities/types/user.type';
import { PoolClient } from 'pg';
import { UserModelStore } from '../../models/user.model';
import { Auth } from '../../models/auth.model';

const AuthStore: Auth = new Auth();
const UserStore: UserModelStore = new UserModelStore();
describe('2- test User Model', (): void => {
  describe('1- check defined methods in User Model', (): void => {
    it('it should have index method to get all users', () => {
      expect(UserStore.index).toBeDefined();
    });
    it('it should have show method to get  user info', () => {
      expect(UserStore.show).toBeDefined();
    });
    it('it should have update method to update current user data', () => {
      expect(UserStore.update).toBeDefined();
    });
    it('it should have delete method to delete user', () => {
      expect(UserStore.delete).toBeDefined();
    });
    it('it should have check email method to check user email is uniqe', () => {
      expect(UserStore.checkEmailUniqe).toBeDefined();
    });
    it('it should have findUserById method to check user exist', () => {
      expect(UserStore.findUserById).toBeDefined();
    });
  });

  describe('2- Test User Model Logic', (): void => {
    const user: User = {
      username: 'azhar omer',
      firstname: 'azhar',
      lastname: 'omer',
      email: 'azharomer880@gmail.com',
      password: 'admin123',
    } as User;

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

    it('index method return all avalible users in DB', async () => {
      const usersArr: User[] = await UserStore.index();
      expect(usersArr.length).toEqual(1);
    });

    it('show method return user info in DB', async () => {
      const userInfo: User = await UserStore.show(user.id as number);
      expect(userInfo).toEqual({
        id: user.id,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      } as User);
    });

    it('Update user method return user updated info in DB', async () => {
      const userInfo: User = await UserStore.update({
        ...user,
        lastname: 'omar',
        username: 'azhar Test',
      });
      expect(userInfo).toEqual({
        id: user.id,
        email: user.email,
        username: 'azhar Test',
        firstname: user.firstname,
        lastname: 'omar',
      } as User);
    });

    it('check email uniqe  method return exist user with same email or not', async () => {
      const found: User | null = await UserStore.findUserByEmail(user.email);
      expect(!found).toBeFalse();
    });

    it('check email uniqe when update user method return boolean', async () => {
      const found: boolean = await UserStore.checkEmailUniqe(
        user.id as number,
        user.email
      );
      expect(found).toBeTrue();
    });

    it('Delete user method return userinfo', async () => {
      const userInfo: User = await UserStore.delete(user.id as number);
      expect(userInfo).toEqual({
        id: user.id,
        email: user.email,
        username: 'azhar Test',
        firstname: user.firstname,
        lastname: 'omar',
      } as User);
    });
  });
});
