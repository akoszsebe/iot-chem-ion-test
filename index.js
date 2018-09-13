'use strict';

let express = require('express'),
  app = express(),
  // Configuring Passport
  passport = require('passport'),
  expressSession = require('express-session'),
  bodyParser = require('body-parser'),
  http = require('http').Server(app),
  io = require('socket.io')(http);

// set port
app.set('port', process.env.PORT || 8081);

app.use(express.static(__dirname + '/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next()
});

// run
http.listen(app.get('port'), () => {
  console.info('App is running on port ', app.get('port'))
});

exports = module.exports = app;

app.use(expressSession({secret: 'mySecretKey', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

let initPassport = require('./backend/passport/init');
initPassport(passport);

// routing
require('./backend/routes')(app, passport, io);
