const mongoose = require('mongoose');
// const validator = require('validator');

const WeekDays = {
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
  0: 'sunday',
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
  dayOfWeek: String,
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

eventSchema.pre('save', function(next) {
  numDay = this.dateTime.getDay()
  this.dayOfWeek = WeekDays[numDay]
  next();
});

eventSchema.pre(/^find/, function(next) {
  this.select('-dateTime');
  next();
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
