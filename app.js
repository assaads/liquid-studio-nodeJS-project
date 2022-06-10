var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//connect to db
// const client = require('./dbconn.js')
// client.connect();

//const express = require('express');
const app = express();

app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3000");
})


//routes variables
var indexRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/javascripts')));
app.use(express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.static(path.join(__dirname, 'public/images')));

//routes
app.use('/login', indexRouter);
app.use('/register', indexRouter);
app.use('/logout', indexRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//add
//add
// const flash = require("express-flash");
// const session = require("express-session");
// const { pool } = require("./dbconn");

// app.use(express.urlencoded({ extended: false }));
//     app.set("view engine", "ejs");

//     app.use(
//         session({
//             secret: process.env.SESSION_SECRET,
//             resave: false,
//             saveUninitialized: false
//         })
//     );

// app.use(flash());