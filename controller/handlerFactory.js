const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIfeatures = require('../utils/apiFeature');

exports.deleteOne = (Model) => 
    catchAsync(async (req, res, next) => {
    const doc =  await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('No document found with this ID', 404));

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getOne = (Model , popOptions) => catchAsync(async (req, res) => {
  let query = Model.findById(req.params.id);
  if (popOptions) query = query.populate(popOptions); 
  const doc = await query;

  res.status(200).json({
    status: 'success',
    data: { doc },
  });
});

exports.updateOne = Model => catchAsync(async (req, res) => {
  const tour = await Model.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new : true
  });
  // Checking if the body property exists as the property in the data or not.
  if (tour.get(Object.keys(req.body).toString()) === undefined) {
    res.status(404).json({
      status: 'Invalid',
      message: `Invalid key name, it doesn't exist in ${Model}DB`,
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  }
});

exports.getAll = Model => catchAsync(async (req, res) => {

  // let filter = {};
  // if (req.params.tourId ) filter = {tour: req.params.tourId};

  const features = new APIfeatures(Model.find(), req.query).sortApi().limitingFields().pagination().filter();
  const tours = await features.apiData;

  res.status(200).json({
    status: 'success',
    dataSize: tours.length,
    data: tours,
  });
});