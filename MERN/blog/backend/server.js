import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './db/config.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(cors());

const start = async () => {
  try {
    await db();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

start();
