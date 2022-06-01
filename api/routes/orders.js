import express from "express";
import {
  verifyTokenAndAuth,
  verifyToken,
  verifyTokenAndApproved,
  verifyTokenAndAdmin,
} from "./verifyToken.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
} from "../controllers/orders.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);

router.get("/", verifyToken, getAllOrders);

router.get("/user", verifyTokenAndAuth, getUserOrders);

router.put("/update/:id", verifyTokenAndApproved, getUserOrders);

export default router;
