const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const { isObjectIdOrHexString, default: mongoose } = require('mongoose');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

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

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
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

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
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

exports.getOneByParam = (Model) =>
  catchAsync(async (req, res, next) => {
    if (isObjectIdOrHexString(req.params.param)) {
      // If param is an ID
      query = Model.findById(req.params.param);
    } else {
      var day = req.params.param;
      // If param is a weekday
      query = Model.find({ dayOfWeek: day })

    }
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that parameter', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.deleteOneByParam = (Model) =>
  catchAsync(async (req, res, next) => {
    if (isObjectIdOrHexString(req.params.param)) {
      // If param is an ID
      query = Model.findByIdAndDelete(req.params.param);
    } else {
      var day = req.params.param;
      // If param is a weekday
      query = Model.deleteMany({ dayOfWeek: day })

    }
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that parameter', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });