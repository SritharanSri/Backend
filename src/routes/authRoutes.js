import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// Sign-up route
router.post("/signup", signup);

// Login route
router.post("/login", login);

export default router;
