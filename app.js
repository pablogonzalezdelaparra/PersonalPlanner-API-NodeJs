//Imports
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const eventRouter = require('./routes/eventRoutes');
const globalErrorHandler = require('./controllers/errorController');

//Create an express app
const app = express();

//Global middlewares
//Set security HTTP headers
app.use(helmet());

//Development status
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests from same IP
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Serving static files (path)
app.use(express.static(`${__dirname}/public`));

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Routes
app.use('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the API. Access one of the many valid routes.'
  });
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/events', eventRouter);

//Default route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!
  Please try a valid route`, 404));
});

//Error handling
app.use(globalErrorHandler);

//Exports
module.exports = app;
