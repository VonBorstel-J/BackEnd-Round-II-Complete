const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const Registration = mongoose.model('Registration');

app.use(expressSession ({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 600000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(Registration.createStrategy());

passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/', routes);

module.exports = app;