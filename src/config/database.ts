import { Pool } from 'pg';
import env from './app';

const Client: Pool = new Pool({
  host: env.DB_Host,
  port: parseInt(env.DB_Port as string, 10),
  database: env.DB_Name,
  user: env.DB_User,
  password: env.DB_Pass,
});

export default Client;
