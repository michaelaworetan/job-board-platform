const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

//Routes
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes'); // Import job routes
// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  // Use auth routes and specify the base path
app.use('/api/jobs', jobRoutes);  // Use job routes and specify the base path
// app.use('/api/applications', applicationRoutes);

// Root endpoint for health check
app.get('/', (req, res) => {
    res.send('job-board-platform API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

module.exports = app;
