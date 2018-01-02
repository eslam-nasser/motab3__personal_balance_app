const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cookieSession   = require('cookie-session');

const cors            = require('cors')
const config          = require('config')
const mongoose        = require('mongoose')


const index = require('./routes/index');
const payment = require('./routes/payment');
const income = require('./routes/income');
const users = require('./routes/users');

const app = express();
mongoose.Promise = global.Promise
mongoose.connect(config.db, { useMongoClient: true })
mongoose.connection.on('connected', () => {
  console.log(` | Database Is Live and Connected |\n ================================== \n`)
})
mongoose.connection.on('error', (error) => {
  console.log('Something worng!! ==>', error.message)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

// Session
app.use(cookieSession({
  name: 'session',
  keys: ['icEgv95GyU', 'r5oQr21nj5'],
  maxAge: 24 * 60 * 60 * 1000 // 1 day
}))
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});


app.use('/', index);
app.use('/payment', isAuthenticated, payment);
app.use('/income', isAuthenticated, income);
app.use('/users', users);

// Check if the user have a session
function isAuthenticated(req, res, next) {
    if (req.session.user.name && req.session.user.id){
        return next();
    }
    res.redirect('/users/login');
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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
