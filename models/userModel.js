//Imports
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

//Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please tell us your first name!'],
    validate: [validator.isAscii, 'Please provide a valid first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please tell us your last name!'],
    validate: [validator.isAscii, 'Please provide a valid last name'],
  },
  birthDate: {
    type: Date,
    required: [true, 'Please tell us your birth date!'],
    validate: [validator.isDate, 'Please provide a valid date'],
  },
  city: {
    type: String,
    required: [true, 'Please tell us your city!'],
    validate: [validator.isAscii, 'Please provide a valid city'],
  },
  country: {
    type: String,
    required: [true, 'Please tell us your country!'],
    validate: [validator.isAscii, 'Please provide a valid country'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
});

//Pre-save middleware
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.confirmPassword = undefined;
  next();
});

//Validate password
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//Query middleware
userSchema.pre(/^find/, function(next) {
  this.select('-__v');
  next();
});

//Model
const User = mongoose.model('User', userSchema);

//Exports
module.exports = User;
