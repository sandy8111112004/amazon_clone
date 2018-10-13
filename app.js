const createError = require('http-errors');
const express = require('express');
const path = require('path');
const { mongoose } = require('./db/mongoose');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const inventoryRouter = require('./routes/inventories');

const app = express();

app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// load all partials -- e.g. navbar
hbs.registerPartials(__dirname + '/views/partial');

// routings here.  we can add more routings if needed.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/inventories', inventoryRouter);

// Chan: will use app.js as start.
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('server running on port', +app.get('port'));
});

// Chan: the following is to use bin/www as start.
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

// $('.page-item').on('click', function () {
//   $('.disabled').removeClass('disabled');
//   // $(this).addClass('disabled');
// });