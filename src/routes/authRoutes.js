import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: johndoe
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: johndoe@maildrop.cc
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: securepassword123
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User Signup
 *     description: Register a new user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticate an existing user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */


router.post("/signup", signup);

router.post("/login", login);

export default router;
