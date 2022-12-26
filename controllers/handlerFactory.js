//Imports
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

//Delete one
exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    //Variables
    let doc = null
    let filter = {};

    //Filters
    if (req.query._id){
      filter = { _id: req.query._id };
      doc = await Model.deleteOne(filter);
    }
    if (req.query.weekday){
      filter = { dayOfWeek: req.query.weekday };
      doc = await Model.deleteMany(filter);
    } 
  
    //Error handling
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    //Response
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

//Create one
exports.createOne = Model =>
  catchAsync(async (req, res, _next) => {
    //Query
    const doc = await Model.create(req.body);

    //Response
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

//Get all
exports.getAll = Model =>
  catchAsync(async (req, res, _next) => {
    //Variables
    let filter = {};

    //Filters
    if (req.query.id) filter = { _id: mongoose.Types.ObjectId(req.query.id) };
    if (req.query.weekday) filter = { dayOfWeek: req.query.weekday };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    //Response
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });
