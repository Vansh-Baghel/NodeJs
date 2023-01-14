const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const morgan = require('morgan');
const errorController = require('./controller/errorController');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const AppError = require('./utils/appError');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

app.use(morgan('dev'));

// Safety measures 
// 1. Limiting requests.
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 100,  // Setting for 1 hour
    message: "Too many requests from this IP, please try again after an hour!"
})
// Will affect all routes starting with api
app.use('/api', limiter); 

// 2. Sanitizing the inputs 
app.use(mongoSanitize());

// 3. XSS
app.use(xss());

// 4. Accepting in range files only
app.use(express.json({limit: '10kb'})); 

// 5. HPP
app.use(hpp({
    whitelist: ['ratingsQuantity', 'durationDays', 'price']
}))

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/review', reviewRouter);

// This will run when any of the above router is not met. As these are middlewares.
app.all("*", (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
})

app.use(errorController);

module.exports = app;

// app.get('/api/v1/tours', jsonParser, getAllTours);

// app.get('/api/v1/tours/:id', jsonParser, getTour);

// app.post('/api/v1/tours', jsonParser, createTour);

// app.patch('/api/v1/tours/:id', jsonParser, updatingTours);


