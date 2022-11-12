const express = require('express');
const eventController = require('./../controllers/eventController');

const router = express.Router();

router.get('/', eventController.getAllEvents)

// Generic routes (Admin)
router
  .route('/:id')
  .get(eventController.getEvent)
  .post(eventController.createEvent)
  .delete(eventController.deleteEvent);

router
  .route('/:weekday')
  .get(eventController.getEvent)
  .delete(eventController.deleteEvent);

module.exports = router;