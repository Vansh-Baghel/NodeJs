const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { promisify } = require('util');
const { findOne } = require('../models/userModel');
const sendEmail = require('../utils/email');
const crypto = require('crypto');

// {id} is same as {id : newUser._id} because parameter id will be passed when this function will be called.
const signToken = (id) => {
  // dont forget to return
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    // Will open only on http web pages.
    httpOnly: true,
  }
  
  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    data: {
      user,
      token,
    },
  });
};

exports.signup = catchAsync(async (req, res) => {
  // 1st way : Destructing the input object
  // const {name, email,password, passwordConfirm} = req.body;
  // const users = await User.create(name,email,password,passwordConfirm);

  // 2nd way of passing specific properties
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  // expiresIn is optional
  createSendToken(newUser._id, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
  // Destructing from the body
  const { email, password } = req.body;

  // 1. Checking if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password!! ', 404));
  }

  // 2. Check if the email and password is correct from first entered or not.
  const user = await User.findOne({ email }).select('+password');

  // const correct = await user.correctPassword(password, user.password);
  // We need to add the correct variable body inside the if statement because user.password will not exist if there is no user,
  // which will cause error.
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3. Everything is ok , send the token to client
  createSendToken(user._id, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // 1. Get the token and check if its there or not
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please login to proceed the step.', 401));
  }

  // 2. Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3. Check if user exist or not
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError('The user which belongs to this token no longer exist.'));
  }

  // 4. If the password is changed then token must be changed
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed the password! Please login again.', 401));
  }

  // Here it is saving the req.user data, otherwise in all the methods after this, req.user will be undefined.
  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(roles);
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending the email. Try again later!'), 500);
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2. If token not expired, means user is present and therefore set the new password.
  if (!user) {
    return next(new AppError('Token is invalid or has expired!', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  // Here we do need to check the validation, therefore didnt set to false.
  await user.save();

  // 3. Updated changePasswordAt property for user
  // Written in Model as pre middleware

  // 4. Login user, send JWT
  createSendToken(user._id, 200, res);
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const inputPassword = req.body.password;
  const newInputPassword = req.body.newPassword;
  const confirmNewInputPassword = req.body.confirmNewPassword;

  // 1. Get user from collection.
  // Got req.user when we updated the router and added authController.protect
  const user = await User.findById(req.user.id).select('+password');

  // 2. Check if posted current password is correct.
  console.log({ inputPassword }, user.password);
  if (await !user.correctPassword(inputPassword, user.password)) {
    return next(new AppError("Entered password doesn't match your email"));
  }

  // 3. If yes, update the password.
  user.password = newInputPassword;
  user.passwordConfirm = confirmNewInputPassword;
  await user.save({ validateBeforeSave: false });

  // 4. Log user in, send JWT
  createSendToken(user._id, 200, res);
});
