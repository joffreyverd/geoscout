const express = require('express');
const cors = require('cors')
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/build')));
require('./routes/routes')(app);


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = app.listen(5555, function () 
{
	const host = 'localhost'
	const port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});

module.exports = app;
