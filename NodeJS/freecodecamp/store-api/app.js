import express from 'express';
import dotenv from "dotenv";
//import expressAsyncErrors from 'express-async-errors';
import connectDB from './db/connect.js';
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import productsRouter from "./routes/products.js"

const app = express();

dotenv.config();

app.use(express.json());

app.get('/', (req, res) => {res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');})

// Route
app.use('/api/v1/products', productsRouter)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 8080;

// ha van adatbázisunk csak akkor inditjuk a 8000 portot
const start = async () => {
  try {
    await connectDB();
    app.listen(port, console.log(`Server listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();