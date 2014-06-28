// get access to the packages we need

var express		= require('express');
var app				= express();
var port			= process.env.PORT || 8080;
var mongoose	= require('mongoose');
var passport	= require('passport');
var flash 		= require('connect-flash');

var morgan		= require('morgan');
var cookieParser	= require('cookie-parser');
var bodyParser		= require('body-parser');
var session				= require('express-session');

var configDB = require(./config/database.js);


mongoose.connect(configDB.url);

// require('./config/passport')(passport);

// EXPRESS

app.use(morgan('dev'));		// logs all requests to console
app.use(cookieParser());	// reads cookies
app.use(bodyParser()); 		// gets info from html forms

app.set('view engine', 'ejs');

// PASSPORT / AUTH
app.use(session({ secret: 'temporarydevelopmentsecret' }));
app.use(passport.initialize());
app.use(passport.session());		// keep login session
app.use(flash());								// use connect-flash to display flash messages

// ROUTES
require('./app/routes.js')(app, passport);

// START SERVER
app.listen(port);
console.log('Revving the engines in port ' + port);