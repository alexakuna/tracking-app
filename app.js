const express = require('express');
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const conf = require('./conf/config')

mongoose.connect(conf.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('Connected DB'))
    .catch(error => console.log(error))

const authRouter = require('./routes/auth');
const mainRouter = require('./routes/main');
const traceRouter = require('./routes/tracking');

const app = express();

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
app.use('/api/track', traceRouter);

app.use(express.static(__dirname + "/dist/"))
app.get(/.*/, function (req, res) {
    res.sendFile(__dirname + "/dist/index.html")
})

module.exports = app;
