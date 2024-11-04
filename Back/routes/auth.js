const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and User Registration
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "strongpassword123"
 *               role:
 *                 type: string
 *                 enum: [admin, reporter, viewer]
 *                 example: "reporter"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "strongpassword123"
 *     responses:
 *       200:
 *         description: Login successful, JWT token set as httpOnly cookie
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
router.post('/login', loginUser);

module.exports = router;
