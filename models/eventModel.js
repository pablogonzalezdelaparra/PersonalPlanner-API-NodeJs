//Imports
const mongoose = require('mongoose');
const validator = require('validator');

const eventSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Please tell us the description!'],
    validate: [validator.isAscii, 'Please provide a valid description'],
  },
  dateTime: {
    type: Date,
    required: [true, 'Please tell us the date time!'],
    validate: [validator.isDate, 'Please provide a valid date'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    validate: [validator.isDate, 'Please provide a valid date'],
  },
  dayOfWeek: {
    type: String,
    required: [true, 'Please tell us the weekday!'],
    validate: [validator.isAscii, 'Please provide a valid day of the week'],
  },
  id: false,
  versionKey: false,
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

//Pre-save middleware
eventSchema.pre('save', function(next) {
  next();
});

//Query middleware
eventSchema.pre(/^find/, function(next) {
  this.select('-dateTime');
  this.select('-__v');
  next();
});

//Model
const Event = mongoose.model('Event', eventSchema);

//Exports
module.exports = Event;
