var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./routes/routes')(app);

const server = app.listen(5555, function () 
{
	const host = 'localhost'
	const port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});


module.exports = app;
