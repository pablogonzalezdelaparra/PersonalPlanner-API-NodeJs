const mongoose = require('mongoose');
// const validator = require('validator');


const WeekDays = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 0,
}

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
  dayOfWeek: Number,
  id: false,
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

eventSchema.pre('save', function(next) {
  this.dayOfWeek = this.dateTime.getDay()
  next();
});

eventSchema.pre(/^find/, function(next) {
  this.select('-dateTime');
  next();
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
