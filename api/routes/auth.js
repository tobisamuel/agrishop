import express from "express";
import { loginUser, registerUser } from "../controllers/auth.js";

const router = express.Router();

//REGISTER USER
router.post("/register", registerUser);

//LOGIN
router.post("/login", loginUser);

export default router;
