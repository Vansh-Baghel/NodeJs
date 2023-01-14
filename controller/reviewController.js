const mongoose = require('mongoose');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// 1. Getting all reviews

// 2. Creating new reviews
exports.createReview = catchAsync(async (req, res) => {
    if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  
  const inputData = {
    review: req.body.review,
    rating: req.body.rating,
    createdAt: req.body.createdAt,
    tour: req.body.tour,
    user: req.body.user,
  };


  const newrReview = await Review.create(inputData);

  res.status(201).json({
    status: 'success',
    review: { newrReview },
  });
});


// Delete the review
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);