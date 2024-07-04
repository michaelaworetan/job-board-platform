const Application = require('../models/Application');   // Importing the Application model
const Job = require('../models/Job');   // Importing the Job model for reference
const User = require('../models/User');  // Importing the User model for reference

// Create a new application
exports.createApplication = async (req, res) => {
  try {
    const { job, coverLetter } = req.body;

    // Create a new Application instance
    const application = new Application({
      job,
      jobSeeker: req.user.id, // Get jobSeeker ID from authenticated user
      coverLetter
    });

    // Save the application to the database
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all applications
exports.getApplications = async (req, res) => {
  try {
    // Find all applications and populate job and jobSeeker details
    const applications = await Application.find().populate('job', ['title']).populate('jobSeeker', ['username', 'email']);
    res.status(200).json(applications);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get an application by ID
exports.getApplicationById = async (req, res) => {
  try {
    // Find an application by ID and populate job and jobSeeker details
    const application = await Application.findById(req.params.id).populate('job', ['title']).populate('jobSeeker', ['username', 'email']);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an application by ID
exports.updateApplication = async (req, res) => {
  try {
    const { coverLetter } = req.body;

    // Find an application by ID
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if the logged-in user is the job seeker who submitted the application
    if (application.jobSeeker.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Update the cover letter
    application.coverLetter = coverLetter;

    // Save the updated application to the database
    await application.save();
    res.status(200).json(application);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete an application by ID
exports.deleteApplication = async (req, res) => {
  try {
    // Find an application by ID
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if the logged-in user is the job seeker who submitted the application
    if (application.jobSeeker.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Delete the application from the database
    await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Application removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
