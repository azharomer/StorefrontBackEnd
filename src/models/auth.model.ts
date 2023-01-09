import { PoolClient } from 'pg';
import Client from '../config/database';
import User from '../utilities/types/user.type';
import Error from '../utilities/interfaces/error.interface';
import Services from '../utilities/services/password.service';

export class Auth {
  // Register method
  async register(user: User): Promise<User> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string =
        'INSERT INTO users (username, firstname, lastname, email, password) values ($1, $2, $3, $4, $5) RETURNING id, username, firstname, lastname, email';
      const hashPassword: string = Services.createHash(user.password);
      const result = await conn.query(sql, [
        user.username,
        user.firstname,
        user.lastname,
        user.email,
        hashPassword,
      ]);
      const new_user: User = result.rows[0];
      conn.release();
      return new_user;
    } catch (err) {
      throw new Error(`couldn't create user ${user.username}, error ${err}`);
    }
  }

  async auth(email: string, auth_password: string): Promise<User | null> {
    try {
      const conn: PoolClient = await Client.connect();
      const sql: string = 'SELECT password FROM users WHERE email = ($1)';
      const result = await conn.query(sql, [email]);

      if (result.rows.length) {
        const { password } = result.rows[0];
        const check: boolean = Services.checkPassword(auth_password, password);
        if (check) {
          const userData = await conn.query(
            'SELECT id, email, username, firstname, lastname FROM users WHERE email = ($1)',
            [email]
          );
          conn.release();
          return userData.rows[0];
        }
      }
      conn.release();
      return null;
    } catch (err) {
      console.log(err);
      const error = err as Error;
      throw new Error(`couldn't login with error:  ${error.message}`);
    }
  }
}
