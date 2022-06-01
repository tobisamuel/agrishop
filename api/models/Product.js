import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    category: { type: String },
    vendor: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
