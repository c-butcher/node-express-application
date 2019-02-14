const createError = require('http-errors');
const passport = require('passport');
const express = require('express');
const validator = require('express-validator');
const validation = require('./validation');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const database = require('./database');
const session = require('./session');
const flash = require('connect-flash');
const app = express();

// Configure how the user is stored in the session.
passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });

// Load our environment variables
require('dotenv').config();

// Configure our environment
app.use(cookieParser());
app.use(validator());
app.use(validation());
app.use(session());
app.use(database());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Exposes our user object so that we can access it in our templates.
app.use((req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
  }

  next();
});

// Configure the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Load all of our routes
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/auth/local'));
app.use('/signup', require('./routes/auth/signup'));
app.use('/auth/google', require('./routes/auth/google'));
app.use('/auth/facebook', require('./routes/auth/facebook'));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Handle Errors
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
