import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "product name must be provided"],
  },
  price: {
    type: "number",
    required: [true, "product price must be provided"],
  },
  featured: {
    type: "boolean",
    default: false,
  },
  rating: {
    type: "number",
    default: 4.5,
  },
  createdAt: {
    type: "date",
    default: Date.now(),
  },
  company: {
    type: "string",
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
    //enum: ["ikea", "liddy", "caressa", "marcos"],
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
