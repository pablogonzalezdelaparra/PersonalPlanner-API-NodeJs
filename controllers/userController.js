//Imports
const User = require('./../models/userModel');
const factory = require('./handlerFactory');

//handlerFactory calls
exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
exports.deleteUser = factory.deleteOne(User);
