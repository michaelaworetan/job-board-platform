const Job = require('../models/Job'); // Import the Job model
const { check, validationResult } = require('express-validator'); // Import express-validator for input validation

// Controller function to create a new job
exports.createJob = async (req, res) => {
  // Perform input validation using express-validator
  await check('title', 'Title is required').notEmpty().run(req);
  await check('description', 'Description is required').notEmpty().run(req);
  await check('requirements', 'Requirements are required').notEmpty().run(req);
  await check('contactEmail', 'Please provide a valid email address').isEmail().run(req);

  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructuring request body
  const { title, description, requirements, contactEmail } = req.body;
  const employer = req.user.id; // Get employer ID from authenticated user

  try {
    // Create a new job instance with provided data
    const job = new Job({
      title,
      description,
      requirements,
      contactEmail,
      employer
    });

    await job.save();  // Save the job to the database

    res.status(201).json(job); // Return the created job in the response
  } // Handle any errors
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get all jobs
exports.getJobs = async (req, res) => {
  try {
    // Fetch all jobs from the database
    const jobs = await Job.find().populate('employer', 'username email');

    res.status(200).json(jobs); // Return the jobs in the response
  }// Handle any errors 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Controller function to get a job by ID
exports.getJobById = async (req, res) => {
  try {
    // Fetch job by ID from the database
    const job = await Job.findById(req.params.id).populate('employer', 'username email');
    // If job not found, return 404
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job); // Return the job in the response
  }// Handle any errors 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to update a job by ID
exports.updateJob = async (req, res) => {
  // Perform input validation using express-validator
  await check('title', 'Title is required').notEmpty().run(req);
  await check('description', 'Description is required').notEmpty().run(req);
  await check('requirements', 'Requirements are required').notEmpty().run(req);
  await check('contactEmail', 'Please provide a valid email address').isEmail().run(req);

  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Fetch job by ID from the database
    let job = await Job.findById(req.params.id);

    // If job not found, return 404
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if the user is the employer who posted the job
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    // Destructure request body
    const { title, description, requirements, contactEmail } = req.body;

    // Update job fields
    job.title = title;
    job.description = description;
    job.requirements = requirements;
    job.contactEmail = contactEmail;

    // Save the updated job to the database
    await job.save();

    // Return the updated job in the response
    res.status(200).json(job);
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: err.message });
  }
};

// Controller function to delete a job by ID
exports.deleteJob = async (req, res) => {
  try {
    // Fetch job by ID from the database
    const job = await Job.findById(req.params.id);

    // If job not found, return 404
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if the user is the employer who posted the job
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    // Delete the job from the database
    await job.remove();

    // Return a success message
    res.status(200).json({ message: 'Job removed' });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: err.message });
  }
};
