//Imports
const express = require('express');
const eventController = require('./../controllers/eventController');
const authController = require('./../controllers/authController');

//Create router
const router = express.Router();


//Routes
router
  .route('/')
  .get(eventController.getAllEvents)
  .delete(authController.protect, eventController.deleteEvent)
  .post(eventController.createEvent);

//Exports
module.exports = router;