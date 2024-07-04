// controllers/userController.js

const User = require('../models/User'); // Import the User model
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation
const { check, validationResult } = require('express-validator'); // Import express-validator for input validation

// Controller function to register a new user
exports.registerUser = async (req, res) => {
  // Perform input validation using express-validator
  await check('username', 'Username is required').notEmpty().run(req);
  await check('email', 'Please provide a valid email address').isEmail().run(req);
  await check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }).run(req);
  await check('role', 'Role must be either employer or job_seeker').isIn(['employer', 'job_seeker']).run(req);

  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password, role } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Check if a user with the same username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    // Create a new user with the provided data
    const user = new User({ username, email, password, role });

    // Save the user to the database
    await user.save();

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the created user and token in the response
    res.status(201).json({ user, token });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: err.message });
  }
};

// Controller function to login a user
exports.loginUser = async (req, res) => {
  // Perform input validation using express-validator
  await check('email', 'Please provide a valid email address').isEmail().run(req);
  await check('password', 'Password is required').notEmpty().run(req);

  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the provided password matches the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the logged-in user and token in the response
    res.status(200).json({ user, token });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: err.message });
  }
};
