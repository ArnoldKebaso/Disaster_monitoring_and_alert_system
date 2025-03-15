// middleware/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log('Auth Middleware - Received Token:', token);
    
    if (!token) {
      console.log('No token found');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    // Fetch the user and check if the token matches the stored hashed token
    const user = await User.findByPk(decoded.id);
    if (!user || !user.currentToken) {
      console.log('No active token found for user');
      res.clearCookie('token');
      return res.status(401).json({ error: 'Invalid session' });
    }

    // Compare the plain token with the stored hashed token
    const tokenMatch = await bcrypt.compare(token, user.currentToken);
    if (!tokenMatch) {
      console.log('Token mismatch');
      res.clearCookie('token');
      return res.status(401).json({ error: 'Invalid session' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth Error:', error.message);
    res.clearCookie('token');
    return res.status(401).json({ error: 'Invalid session' });
  }
};


module.exports = authMiddleware;
// This middleware function is used to authenticate incoming requests. It verifies the JWT token from the cookie, decodes it, and compares it with the hashed token stored in the user model. If the token is valid, the user object is attached to the request object, and the request is passed to the next middleware function. Otherwise, an error response is sent back to the client.