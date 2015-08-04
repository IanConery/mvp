var Firebase = require("firebase");
var express = require('express');
var morgan = require('morgan');

var app = express();
var myFirebaseRef = new Firebase("https://blistering-fire-5536.firebaseio.com/");
  
app.use(morgan('dev'));

app.listen(8080);

module.exports = app;
