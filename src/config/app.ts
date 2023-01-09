import * as env from 'dotenv';

env.config();

const {
  PORt,
  ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  SALT_ROUNDS,
  BCRYPT_PASSWORD,
  TOKEN_SECRIT,
} = process.env;

export default {
  Port: PORt,
  DB_Host: POSTGRES_HOST,
  DB_Port: POSTGRES_PORT,
  DB_Name: ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  DB_User: POSTGRES_USER,
  DB_Pass: POSTGRES_PASSWORD,
  Salt: SALT_ROUNDS,
  papper: BCRYPT_PASSWORD,
  token: TOKEN_SECRIT,
};
