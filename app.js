const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./src/config/mongodb.config');
require('dotenv').config();


const app = express();

app.set("trust proxy", 1);
app.use(cors({ origin: true, credentials: true }));
// app.options('*', cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
const apiRouter = require('./src/routes/api');
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

module.exports = app;
