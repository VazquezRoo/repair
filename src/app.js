const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const sanitizer = require('perfect-express-sanitizer');
const hpp = require('hpp');
const morgan = require('morgan');

//middleware errors
const globalErrorHandler = require('./controllers/error.controllers');
const AppError = require('./utils/appError');

//Routes
const repairRouter = require('./routes/repair.routes');
const userRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');

const app = express();
const limiter = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in one hour!',
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
  })
);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1', limiter);

app.use('/api/v1/repair', repairRouter);

app.use('/api/v1/user', userRouter);

app.use('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
