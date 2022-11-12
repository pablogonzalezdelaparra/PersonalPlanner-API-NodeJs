const mongoose = require('mongoose');
// const validator = require('validator');

const eventSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Please tell us the description!']
  },
  dateTime: {
    type: Date,
    required: [true, 'Please tell us the date time!']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
