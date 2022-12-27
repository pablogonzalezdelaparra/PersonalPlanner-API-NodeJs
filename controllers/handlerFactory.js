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
    if (req.query.id){
      doc = await Model.findByIdAndDelete(req.query.id);
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
    if (req.query.id){
      doc = await Model.findById(req.query.id);
    }
    else if (req.query.weekday){
      filter = { dayOfWeek: req.query.weekday };
      doc = await Model.find(filter);
    }
    else{
      doc = await Model.find();
    }

    //Response
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });
