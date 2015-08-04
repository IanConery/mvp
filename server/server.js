var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
// var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://127.0.0.1/what-should-i-eat'); 
db = mongoose.connection;
db.on('error',console.error.bind(console, 'You messed up'));
db.once('open', function(){
  console.log('Success!! connected to mongoose database')
});
  
app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

app.listen(8080);

module.exports = app;
