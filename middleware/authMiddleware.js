const jwt = require('jsonwebtoken');

// Middleware function to protect routes
const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID and role to the request object
    req.user = { id: decoded.id, role: decoded.role };

    // Call the next middleware function
    next();
  } catch (err) {
    // Handle any errors
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
