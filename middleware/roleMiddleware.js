// Middleware function to restrict access based on user role
const roleMiddleware = (roles) => (req, res, next) => {
    // Check if the user role is authorized
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
  
    // Call the next middleware function
    next();
  };
  
  module.exports = roleMiddleware;
  