const User = require('./../models/userModel');
const factory = require('./handlerFactory');

exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
// exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
