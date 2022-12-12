const express = require('express');
const eventController = require('./../controllers/eventController');

const router = express.Router();

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(eventController.createEvent)

  /*
router
  .route('/:param')
  .get(eventController.getEventByParam)
  .delete(eventController.deleteEventByParam);
  */

module.exports = router;