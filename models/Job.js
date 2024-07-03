const mongoose = require('mongoose');

// Define a new mongoose schema for the Job model
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  // Employer of the job, stored as an ObjectId referencing the User model, and is required
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Creation date of the job, defaults to the current date and time
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a mongoose model named 'Job' based on the jobSchema
const Job = mongoose.model('Job', jobSchema);

// Export the Job model to be used in other parts of the application
module.exports = Job;
