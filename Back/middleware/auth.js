const jwt = require('jsonwebtoken');


// Middleware to check for JWT in the HTTP-only cookie
const authMiddleware = (req, res, next) => {
  try {
    // Retrieve the token from the HTTP-only cookie
    const token = req.cookies?.token;

    // If no token, return unauthorized error
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info to the request object
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
