//Imports
const express = require('express');
const eventController = require('./../controllers/eventController');

//Create router
const router = express.Router();

//Routes
router
  .route('/')
  .get(eventController.getAllEvents)
  .delete(eventController.deleteEvent)
  .post(eventController.createEvent);

//Exports
module.exports = router;