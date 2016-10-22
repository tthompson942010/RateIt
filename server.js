var bodpars= require("body-parser");
var metover= require("method-override");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
var sequelize= require("sequelize");
var express = require('express'),
    exphbs = require('express-handlebars'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    TwitterStrategy = require('passport-twitter'),
    GoogleStrategy = require('passport-google'),
    FacebookStrategy = require('passport-facebook');

// var config = require('./config.js'), //config file contains all tokens and other private info

//    funct = require('./functions.js'); //function file contains helper functions for our Passport and database

var app = express();

app.use(bodpars.json());
app.use(bodpars.urlencoded({extended: true}));
app.use(bodpars.text());
app.use(bodpars.json({type: "application/vnd.api+json"}));

app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted messaged
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

// Configure express to use handlebars templates
var hbs = exphbs.create({
    defaultLayout: 'main', //Page layout
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine' 'handlebars');

// Port

var port = process.env.PORT || 3030; //select your port or let it pull from your .env file
app.listen(port);
console.log("listening on " + port + "!");
