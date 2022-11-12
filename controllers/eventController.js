const factory = require('./handlerFactory');
const Event = require('./../models/eventModel')

// TO-DO
exports.getEventWeekDay = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.find();
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getEvent = factory.getOne(Event);
exports.getAllEvents = factory.getAll(Event);

// Create event
exports.createEvent = factory.createOne(Event);
exports.updateUser = factory.updateOne(Event);
exports.deleteEvent = factory.deleteOne(Event);
