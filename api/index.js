import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import productsRoutes from "./routes/products.js";
import usersRoutes from "./routes/users.js";
import vendorRoutes from "./routes/vendors.js";
import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payment.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = process.env.MONGO_URL;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

app.use("/api", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
