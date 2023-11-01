import pkg from 'pg';
const { Pool, Client } = pkg;

import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;

/* export const db = pgp({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
}); */

export const pool = new Pool({
  type: 'postgres',
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  synchronize: true,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
});


