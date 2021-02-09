var express = require('express');
var mongoose = require('mongoose')
var passport = require('passport')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var conf = require('./conf/config')

mongoose.connect(conf.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('Connected DB'))
    .catch(error => console.log(error))

var authRouter = require('./routes/auth');
var mainRouter = require('./routes/main');

var app = express();

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/', mainRouter);

module.exports = app;
