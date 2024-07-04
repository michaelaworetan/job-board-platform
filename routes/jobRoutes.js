const express = require('express'); // Express framework
const router = express.Router(); // Router instance
const { createJob, getJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController'); // Job controller functions
const auth = require('../middleware/authMiddleware'); // Authentication middleware

/**
 * @route POST /api/jobs  *@desc Create a new job   *@access Private (only logged-in users can create jobs)
 */
router.post('/', auth, createJob);

/**
 * @route GET /api/jobs  *@desc Get all jobs   *@access Public (anyone can view all jobs)
 */
router.get('/', getJobs);

/**
 * @route  GET /api/jobs/:id  *@desc Get a job by ID   *@access Public (anyone can view a job by its ID)
 */
router.get('/:id', getJobById);

/**
 * @route  PUT /api/jobs/:id  *@desc update a job by ID   *@access  Private (only the employer who posted the job can update it)
 */
router.put('/:id', auth, updateJob);

/**
 * @route   DELETE /api/jobs/:id  *@desc  Delete a job by ID   *@access  Private (only the employer who posted the job can delete it)
 */
router.delete('/:id', auth, deleteJob);

// Export the router to be used in other parts of the application
module.exports = router;
