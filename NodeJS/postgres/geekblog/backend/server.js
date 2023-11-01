import express from 'express';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
import users from './routes/users.js';

const app = express();

const port = 8000;

// Middleware a JSON testreszabásához
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

app.use('/api', users);

app.listen(port, () => {
  console.log(`A szerver fut a(z) ${port} porton...`);
});
