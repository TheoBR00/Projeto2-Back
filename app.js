var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
//var databaseRouter = require('./routes/database');

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
const server = express()

server.use(bodyParser.urlencoded({ extended: true}))
server.use(bodyParser.json())

server.listen(port, () => { console.log(`BACKEND is running on port ${port}.`)})

require('./src/config/routes')(server)



const cors = require('cors')


var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
//app.use('/database', databaseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req)
  next(createError(404));
});

// error handler
app.use(function(req, res, next) {
  // set locals, only providing error in development
  var err = new Error('Not Found')
  err.status = 404
  next(err)
});

if (app.get('env') === 'development') {

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message:err.message,
      error:err
    });
  });
}

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message:err.message,
    error:err
  });
});

module.exports = app;
