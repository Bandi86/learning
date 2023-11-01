
import { AppDataSource } from "./data-source"

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users';

const app = express();

app.use(express.json());
dotenv.config();
app.use(cookieParser());

app.use(
    express.urlencoded({
      extended: true,
    })
  );

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.use('/api', usersRouter);

const port = process.env.PORT || 8000; // Választhatod a kívánt portot vagy egy környezeti változót
app.listen(port, () => {
  console.log(`Az alkalmazás fut a http://localhost:${port} címen`);
});
