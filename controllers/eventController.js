//Imports
const factory = require('./handlerFactory');
const Event = require('./../models/eventModel')
const catchAsync = require('./../utils/catchAsync');

//handlerFactory calls
exports.createEvent = factory.createOne(Event);
exports.getAllEvents = factory.getAll(Event);
exports.deleteEvent = factory.deleteOne(Event);
