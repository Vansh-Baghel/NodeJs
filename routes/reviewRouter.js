const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const reviewController = require('../controller/reviewController');
const authController = require('../controller/authController');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(jsonParser, authController.protect, authController.restrictTo('user'), reviewController.createReview);

  // Only users and admins can update or delete the reviews.
router
  .route('/:id')
  .delete(authController.restrictTo('user', 'admin') , reviewController.deleteReview)
  .patch(authController.restrictTo('user', 'admin') , reviewController.updateReview)
  .get(reviewController.getReview);

module.exports = router;
