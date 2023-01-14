const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const userController = require('../controller/userController');
const authController = require('../controller/authController');

router.post('/signup', jsonParser, authController.signup);
router.post('/login', jsonParser, authController.login);
// Didn't use route wala syntax because we won't be using any other method on authentication.
router.post('/forgotPassword', jsonParser, authController.forgotPassword);
router.patch('/resetPassword/:token', jsonParser, authController.resetPassword);

// Setting protect to all middlewares below this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', jsonParser, authController.updateMyPassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', jsonParser, userController.updateMe);
router.delete('/deleteMe', jsonParser, userController.deleteMe);

router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAlluser);
router
  .route('/:id')
  .delete(jsonParser, userController.deleteUser)
  .get(userController.getUser)
  .patch(userController.updateUser);

module.exports = router;
