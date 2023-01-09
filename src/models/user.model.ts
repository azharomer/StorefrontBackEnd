import { PoolClient } from 'pg';
import Client from '../config/database';
import User from '../utilities/types/user.type';
import Services from '../utilities/services/password.service';

export class UserModelStore {
  // index method
  async index(): Promise<User[]> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string =
        'SELECT id, username, firstname, lastname,  email  FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`can't get users ${err}`);
    }
  }
  // show method
  async show(id: number): Promise<User> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string =
        'SELECT id, username,firstname, lastname, email FROM users WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      const user: User = result.rows[0];
      return user;
    } catch (err) {
      throw new Error(`couldn't find user ${id}. error  ${err}`);
    }
  }
  // update method
  async update(user: User): Promise<User> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string =
        'UPDATE users SET username=$1, email=$2 ,firstname= $3 , lastname=$4 , password=$5 WHERE id=$6 RETURNING id, username, firstname, lastname, email';
      const hashPassword: string = Services.createHash(user.password);
      const result = await conn.query(sql, [
        user.username,
        user.email,
        user.firstname,
        user.lastname,
        hashPassword,
        user.id,
      ]);
      const new_user: User = result.rows[0];
      conn.release();
      return new_user;
    } catch (err) {
      throw new Error(`can't update user , error ${err}`);
    }
  }
  // delete method
  async delete(id: number): Promise<User> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string =
        'DELETE FROM users WHERE id = ($1) RETURNING id, username, firstname, lastname, email';
      const result = await conn.query(sql, [id]);
      conn.release();
      const user: User = result.rows[0];
      return user;
    } catch (err) {
      throw new Error(`couldn't delete user ${id}. error  ${err}`);
    }
  }
  // auth method
  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = 'SELECT username FROM users WHERE email = ($1)';
      const result = await conn.query(sql, [email]);
      conn.release();
      if (result.rows.length) {
        const user: User = result.rows[0];
        return user;
      }
      return null;
    } catch (err) {
      return null;
    }
  }
  async findUserById(id: number): Promise<User | null> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string =
        'SELECT id, username, firstname, lastname email FROM users WHERE id = ($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length) {
        const user: User = result.rows[0];
        return user;
      }
      return null;
    } catch (err) {
      return null;
    }
  }
  async checkEmailUniqe(user_id: number, email: string): Promise<boolean> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string =
        'SELECT email FROM users WHERE email = ($1) AND id != ($2)';
      const result = await conn.query(sql, [email, user_id]);
      conn.release();
      return result.rows.length > 0 ? false : true;
    } catch (err) {
      return false;
    }
  }
}
