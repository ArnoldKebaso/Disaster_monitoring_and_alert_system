const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  validateSession,
  updateProfilePhoto,
  changePassword
} = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/uploader'); // Make sure the filename is correct

// Dedicated change password route
router.put('/change-password', authMiddleware, changePassword);

// Dedicated profile photo upload route
router.post('/profile-photo', authMiddleware, upload.single('profilePhoto'), updateProfilePhoto);

// Dynamic routes (place these after the specific routes)
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

// Other routes...
router.get('/user', authMiddleware, getAllUsers);
router.post('/user', authMiddleware, createUser);
router.get('/validate', authMiddleware, validateSession);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { getAllUsers,updateProfilePhoto, changePassword, getUserById, createUser, updateUser, validateSession , deleteUser } = require('../controllers/userController');
// const authMiddleware = require('../middleware/auth');
// const upload = require('../middleware/uploader');

// router.put('/change-password', authMiddleware, changePassword);

// // Dedicated profile photo upload route
// router.post('/profile-photo', authMiddleware, upload.single('profilePhoto'), updateProfilePhoto);




// /**
//  * @swagger
//  * tags:
//  *   name: Users
//  *   description: User management
//  */

// /**
//  * @swagger
//  * /:
//  *   get:
//  *     summary: Get all users
//  *     tags: [Users]
//  *     security:
//  *       - cookieAuth: []
//  *     responses:
//  *       200:
//  *         description: A list of users
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   user_id:
//  *                     type: integer
//  *                     example: 1
//  *                   username:
//  *                     type: string
//  *                     example: "john_doe"
//  *                   email:
//  *                     type: string
//  *                     example: "john@example.com"
//  *                   role:
//  *                     type: string
//  *                     example: "admin"
//  *       401:
//  *         description: Unauthorized
//  */
// router.get('/user', authMiddleware, getAllUsers);

// /**
//  * @swagger
//  * /{id}:
//  *   get:
//  *     summary: Get a user by ID
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: The user ID
//  *     responses:
//  *       200:
//  *         description: The user data
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 user_id:
//  *                   type: integer
//  *                   example: 1
//  *                 username:
//  *                   type: string
//  *                   example: "john_doe"
//  *                 email:
//  *                   type: string
//  *                   example: "john@example.com"
//  *                 role:
//  *                   type: string
//  *                   example: "admin"
//  *       404:
//  *         description: User not found
//  */
// router.get('/user:id', authMiddleware, getUserById);

// /**
//  * @swagger
//  * /:
//  *   post:
//  *     summary: Create a new user
//  *     tags: [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - username
//  *               - email
//  *               - password
//  *               - role
//  *             properties:
//  *               username:
//  *                 type: string
//  *                 example: "jane_doe"
//  *               email:
//  *                 type: string
//  *                 example: "jane@example.com"
//  *               password:
//  *                 type: string
//  *                 example: "strongpassword123"
//  *               role:
//  *                 type: string
//  *                 enum: [admin, reporter, viewer]
//  *                 example: "reporter"
//  *     responses:
//  *       201:
//  *         description: User created successfully
//  *       400:
//  *         description: Bad request
//  */
// router.post('/user', authMiddleware, createUser);

//  router.get('/validate', authMiddleware, validateSession);
// // router.get('/validate', authMiddleware, (req, res) => {
// //     res.set('Cache-Control', 'no-store'); // Prevent caching
// //     res.status(200).json(req.user);
// //   });
// /**
//  * @swagger
//  * /{id}:
//  *   put:
//  *     summary: Update a user by ID
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: The user ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               username:
//  *                 type: string
//  *                 example: "john_updated"
//  *               email:
//  *                 type: string
//  *                 example: "john_updated@example.com"
//  *               role:
//  *                 type: string
//  *                 enum: [admin, reporter, viewer]
//  *                 example: "viewer"
//  *     responses:
//  *       200:
//  *         description: User updated successfully
//  *       404:
//  *         description: User not found
//  */
// router.put('/user:id', authMiddleware, updateUser);
// // routes/user.js
// router.get('/:id', authMiddleware, getUserById);
// router.put('/:id', authMiddleware, updateUser);

// // Profile Photo

// /**
//  * @swagger
//  * /{id}:
//  *   delete:
//  *     summary: Delete a user by ID
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: The user ID
//  *     responses:
//  *       200:
//  *         description: User deleted successfully
//  *       404:
//  *         description: User not found
//  */
// router.delete('/user:id', authMiddleware, deleteUser);

// module.exports = router;
