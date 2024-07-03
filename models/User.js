const mongoose = require('mongoose');  //Import mongoose for schema definition and database interaction
const bcrypt = require('bcryptjs');   //Import bcryptjs for hashing passwords
const validator = require('validator');  // Import validator for email validation

// Define the User schema using mongoose
const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true, 
    unique: true 
  },
  email: {
    type: String, 
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  password: {
    type: String, 
    required: true,
    minlength: 6
  },
  role: {
    type: String, 
    enum: ['employer', 'job_seeker'], // Role must be either 'employer' or 'job_seeker'
    required: true 
  }
});

// Middleware to hash the password before saving the user
userSchema.pre('save', async function(next) {
  // If the password field is not modified, move to the next middleware
  if (!this.isModified('password')) {
    return next();
  }
  // Generate a salt with 10 rounds
  const salt = await bcrypt.genSalt(10);
  // Hash the password using the generated salt
  this.password = await bcrypt.hash(this.password, salt);
  // Call the next middleware
  next();
});

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
