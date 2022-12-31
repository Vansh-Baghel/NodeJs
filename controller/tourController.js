const fs = require('fs');
// const toursRead = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
const Tour = require('../models/tourModel');
const APIfeatures = require('../utils/apiFeature');

const catchAsync = (fn) => {
  // Here return is used because we want to stop the middleware from executing after this. Otherwise it would continue
  //  to go to other middlewares.
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Middleware function
exports.top5Cheap = (req, res, next) => {
  req.query.limit = 5;
  // - indicates the descending order.
  req.query.sort = '-ratingAverage, price';
  req.query.fields = 'name , ratingAverage, price, summary, difficulty';
  next();
};

exports.getAllTours = catchAsync(async (req, res) => {
  const features = new APIfeatures(Tour.find(), req.query).sortApi().limitingFields().pagination();
  const tours = await features.apiData;

  res.status(200).json({
    status: 'success',
    dataSize: tours.length,
    data: tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  // const tour = Tour.findOne({_id: req.params.id})

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

exports.createTour = catchAsync(async (req, res) => {
  const newTour = await Tour.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.updatingTours = catchAsync(async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  // Checking if the body property exists as the property in the data or not.
  if (tour.get(Object.keys(req.body).toString()) === undefined) {
    res.status(404).json({
      status: 'Invalid',
      message: "Invalid key name, it doesn't exist in toursDB",
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

exports.deleteTour = catchAsync(async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
  });
});

exports.getTourStats = catchAsync(async (req, res) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gt: 4.5 } },
    },
    {
      $group: {
        _id: '$difficulty',
        numTours: { $sum: 1 },
        avgRating: { $avg: { $round: ['$ratingsAverage', 0] } },

        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {
  const year = req.params.year;
  const plans = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-12`),
          $lte: new Date(`${year}-12-12`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numToursStart: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $sort: { numToursStart: -1 },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plans,
    },
  });
});
