// Importing mongoose library for MongoDB schema definition
const mongoose = require('mongoose');

// Defining the application schema using mongoose.Schema
const applicationSchema = new mongoose.Schema({
  // Defining 'job' field as ObjectId referencing 'Job' model, which is required
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  // Defining 'jobSeeker' field as ObjectId referencing 'User' model, which is required
  jobSeeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Defining 'coverLetter' field as String, which is required
  coverLetter: {
    type: String,
    required: true
  },
  // Defining 'createdAt' field as Date with default value of current date/time
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Creating mongoose model 'Application' based on 'applicationSchema'
const Application = mongoose.model('Application', applicationSchema);

// Exporting 'Application' model to be used in other parts of the application
module.exports = Application;
