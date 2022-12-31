const express = require('express');
const app = express();
const morgan = require('morgan');
const errorController = require('./controller/errorController');
const tourRouter = require('./routes/tourRouter')
const userRouter = require('./routes/userRouter');
const AppError = require('./utils/appError');

app.use(morgan('dev'));

app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);

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


