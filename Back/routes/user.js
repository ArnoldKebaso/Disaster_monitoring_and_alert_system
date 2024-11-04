const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: "john_doe"
 *                   email:
 *                     type: string
 *                     example: "john@example.com"
 *                   role:
 *                     type: string
 *                     example: "admin"
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, getAllUsers);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "john_doe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 *                 role:
 *                   type: string
 *                   example: "admin"
 *       404:
 *         description: User not found
 */
router.get('/:id', authMiddleware, getUserById);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
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
 *                 example: "jane_doe"
 *               email:
 *                 type: string
 *                 example: "jane@example.com"
 *               password:
 *                 type: string
 *                 example: "strongpassword123"
 *               role:
 *                 type: string
 *                 enum: [admin, reporter, viewer]
 *                 example: "reporter"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', authMiddleware, createUser);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_updated"
 *               email:
 *                 type: string
 *                 example: "john_updated@example.com"
 *               role:
 *                 type: string
 *                 enum: [admin, reporter, viewer]
 *                 example: "viewer"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put('/:id', authMiddleware, updateUser);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;
