// app.js

const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/applications', applicationRoutes);

module.exports = app;
