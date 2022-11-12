const factory = require('./handlerFactory');
const Event = require('./../models/eventModel')

exports.getEvent = factory.getOne(Event);
exports.getAllEvents = factory.getAll(Event);

// Create event
exports.createEvent = factory.createOne(Event);
exports.updateUser = factory.updateOne(Event);
exports.deleteEvent = factory.deleteOne(Event);
