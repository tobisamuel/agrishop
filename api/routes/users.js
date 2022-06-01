import express from "express";
import {
  getUser,
  getAllUsers,
  editUser,
  deleteUser,
} from "../controllers/users.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} from "./verifyToken.js";

const router = express.Router();

//GET USER
router.get("/user/:id", verifyTokenAndAdmin, getUser);

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, getAllUsers);

// EDIT USER
router.put("/update/:id", verifyTokenAndAuth, editUser);

// DELETE USER
router.delete("/delete/:id", verifyTokenAndAuth, deleteUser);

export default router;
