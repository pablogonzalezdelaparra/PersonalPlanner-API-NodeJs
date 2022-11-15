const factory = require('./handlerFactory');
const Event = require('./../models/eventModel')
const catchAsync = require('./../utils/catchAsync');

exports.getEventByParam = factory.getOneByParam(Event)
exports.deleteEventByParam = factory.deleteOneByParam(Event)
exports.getEvent = factory.getOne(Event);
exports.getAllEvents = factory.getAll(Event);

// Create event
exports.createEvent = factory.createOne(Event);
exports.updateUser = factory.updateOne(Event);
exports.deleteEvent = factory.deleteOne(Event);
