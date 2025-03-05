const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log('Auth Middleware - Received Token:', token); // Debug log
    
    if (!token) {
      console.log('No token found');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Debug log
    
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth Error:', error.message);
    res.clearCookie('token');
    return res.status(401).json({ error: 'Invalid session' });
  }
};

module.exports = authMiddleware;