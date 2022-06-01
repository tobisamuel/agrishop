import mongoose from "mongoose";

// const OrderProductSchema = new mongoose.Schema({
//   productId: {
//     type: String,
//   },
//   quantity: {
//     type: Number,
//     default: 1,
//   },
// });

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: { type: Array },
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", OrderSchema);

export default Order;
