import express from "express";
import { verifyTokenAndApproved } from "./verifyToken.js";
import {
  createProduct,
  getProduct,
  getAllProducts,
  getVendorProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";

const router = express.Router();

router.post("/", verifyTokenAndApproved, createProduct);
router.get("/", getAllProducts);
router.get("/vendor", verifyTokenAndApproved, getVendorProducts);
router.get("/:id", getProduct);
router.put("/update/:id", verifyTokenAndApproved, updateProduct);
router.delete("/delete/:id", verifyTokenAndApproved, deleteProduct);

export default router;
