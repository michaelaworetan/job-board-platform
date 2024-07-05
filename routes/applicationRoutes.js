const express = require('express');     // Import the Express library for creating routes
// Create a router instance from Express
const router = express.Router();
const auth = require('../middleware/authMiddleware');      // Import the auth middleware to protect routes that require authentication
// Destructure the controller functions from the applicationController
const { createApplication, getApplications, getApplicationById, updateApplication, deleteApplication } = require('../controllers/applicationController');

/*** @route POST /api/applications* @desc Create a new application* @access Private (only logged-in users can create applications) */
router.post('/', auth, createApplication);

/*** @route GET /api/applications* @desc Get all applications * @access Private (only logged-in users can view applications)*/
router.get('/', auth, getApplications);

/*** @route GET /api/applications/:id * @desc Get a specific application by ID* @access Private (only logged-in users can view applications)*/
router.get('/:id', auth, getApplicationById);

/*** @route PUT /api/applications/:id* @desc Update an application by ID* @access Private (only the job seeker who submitted the application can update it)*/
router.put('/:id', auth, updateApplication);

/*** @route DELETE /api/applications/:id* @desc Delete an application by ID * @access Private (only the job seeker who submitted the application can delete it)*/
router.delete('/:id', auth, deleteApplication);

// Export the router to be used in other parts of the application
module.exports = router;
