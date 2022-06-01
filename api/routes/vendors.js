import express from "express";
import {
  registerVendor,
  loginVendor,
  editVendor,
} from "../controllers/vendors.js";
import { verifyToken, verifyTokenAndApproved } from "./verifyToken.js";

const router = express.Router();

//REGISTER VENDOR
router.post("/register", registerVendor);

//LOGIN
router.post("/login", loginVendor);

// EDIT USER
router.put("/update/:id", editVendor);

export default router;
