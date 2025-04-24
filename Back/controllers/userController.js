const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
const registerUser = async (req, res) => {
  try {
    // Extract user details from the request body
    const { username, email, password, phone, location } = req.body;

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the role set to 'viewer'
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      location,
      role: 'viewer' // Force the role to 'viewer'
    });

    // Respond with the created user's details
    res.status(201).json({
      id: user.user_id,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    // Handle errors during registration
    res.status(400).json({ error: error.message });
  }
};

// Login a user and generate a JWT token
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // Verify the password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Hash the token before storing it
    const hashedToken = await bcrypt.hash(token, 10);
    await user.update({ currentToken: hashedToken });

    // Set the token as a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
      path: '/', // Available on all routes
    });

    // Respond with success message and user details
    res.json({
      message: 'Login successful',
      user: { id: user.user_id, email: user.email, role: user.role }
    });
  } catch (error) {
    // Handle errors during login
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['user_id', 'username', 'email', 'phone', 'location', 'profilePhoto', 'role']
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new user (admin functionality)
const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Create a new user with the provided details
    const newUser = await User.create({ username, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user details by ID
const updateUser = async (req, res) => {
  try {
    const { phone, location } = req.body;

    // Find the user by ID
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Update the user's phone and location
    await user.update({ phone, location });

    // Respond with the updated user details
    res.status(200).json({
      id: user.user_id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      location: user.location
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Delete the user
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Validate the current session of a logged-in user
const validateSession = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) return res.status(401).json({ error: 'User not found' });

    // Respond with the user's details
    res.json({
      id: user.user_id,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update the profile photo of a user
const updateProfilePhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Find the user by ID
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Update the profile photo URL
    const imageUrl = `/uploads/${req.file.filename}`;
    await user.update({ profilePhoto: imageUrl });

    // Respond with success message and the new photo URL
    res.json({
      message: 'Profile photo updated successfully',
      profilePhoto: imageUrl
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile photo' });
  }
};

// Change the password of a user
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Find the user by ID
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Verify the current password
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash the new password and update it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    // Respond with success message
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export all controller functions
module.exports = {
  getAllUsers,
  getUserById,
  validateSession,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  updateProfilePhoto,
  changePassword
};