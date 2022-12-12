const express = require('express');
const eventController = require('./../controllers/eventController');

const router = express.Router();

router
  .route('/')
  .get(eventController.getAllEvents)
  .delete(eventController.deleteEvent)
  .post(eventController.createEvent);

module.exports = router;