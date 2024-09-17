const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '').trim();

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user associated with token
    req.user = await User.findById(decoded._id);

    // Check if user exists
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    res.status(401).json({ message: 'Invalid Token', error: error.message });
  }
};

module.exports = authMiddleware;
