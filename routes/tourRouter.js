const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();
const tourController = require(`../controller/tourController`);
const authController = require(`../controller/authController`);
const reviewRouter = require('./reviewRouter');

router.use('/:tourId/reviews', reviewRouter);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router.route('/tour-stats').get(tourController.getTourStats);

// router.param('id', tourController.checkID);
router.route('/').get(authController.protect, tourController.getAllTours).post(jsonParser, tourController.createTour);

// Using Middleware to get top 5 lowest price datas.
router.route('/top5-lowPrice').get(tourController.top5Cheap, tourController.getAllTours);

router
  .route('/:id')
  .patch(jsonParser, tourController.updatingTours)
  .get(jsonParser, tourController.getTour)
  .delete(
    jsonParser,
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
