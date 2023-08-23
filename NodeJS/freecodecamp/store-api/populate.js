import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import Product from "./models/product.js";
import jsonProducts from "./products.json" assert { type: "json" };

dotenv.config();

// CUSTOM json adat felvítele az adatbázisba

const start = async () => {
  try {
    await connectDB();
    await Product.deleteMany()
    await Product.create(jsonProducts)
    console.log("Succes");
    // ha sikeres volt a migrálás akkor lépjünk ki
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
