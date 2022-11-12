const express = require('express');
const eventController = require('./../controllers/eventController');

const router = express.Router();

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(eventController.createEvent)

router
  .route('/:id')
  .get(eventController.getEvent)
  .delete(eventController.deleteEvent);

//router
  //.route('/:weekday')
  //.get(eventController.getEventWeekDay)
  //.delete(eventController.deleteEvent);

module.exports = router;