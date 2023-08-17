import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMIddleware.js";
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser' 

dotenv.config();

connectDB()

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

// CUSTOM ERROR MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

/* ROUTES
POST api users register
POST api users auth authentication and token
POST api users logout clear cookies
GET api users profile get user profile
PUT api users update profile
*/

app.listen(port, () => console.log(`listening on port ${port}`));
