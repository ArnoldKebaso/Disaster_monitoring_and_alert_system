const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Register new user
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  
  try {
    
    // Create the user
    const newUser = await User.create({ 
      username, 
      email, 
      password, 
      role 
    });
    
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user and generate JWT
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Compare passwords
    const match = user.password === password;
    
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    
    // Generate JWT token
    const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    
    // Set JWT as an HttpOnly cookie
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 3600000 // 1 hour
    });
    
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = await User.create({ username, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update({ username, email, role });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, registerUser, loginUser };
