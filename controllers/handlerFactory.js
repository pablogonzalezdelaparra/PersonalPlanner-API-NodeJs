const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {

    let doc = null
    let filter = {};
    if (req.query._id){
      filter = { _id: req.query._id };
      doc = await Model.deleteOne(filter);
    } 
    if (req.query.weekday){
      filter = { dayOfWeek: req.query.weekday };
      doc = await Model.deleteMany(filter);
    } 
  
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.query.id) filter = { _id: mongoose.Types.ObjectId(req.query.id) };
    if (req.query.weekday) filter = { dayOfWeek: req.query.weekday };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    //console.log(features)
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });
