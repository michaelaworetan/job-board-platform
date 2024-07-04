const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

// Example of a protected route for both employers and job seekers
router.get('/profile', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

// Example of a role-based protected route for employers
router.get('/employer-dashboard', authMiddleware, roleMiddleware(['employer']), (req, res) => {
  res.send('This is an employer-only route');
});

// Example of a role-based protected route for job seekers
router.get('/jobseeker-dashboard', authMiddleware, roleMiddleware(['job_seeker']), (req, res) => {
  res.send('This is a job_seeker-only route');
});

// Export the router for use in other parts of the application
module.exports = router;
