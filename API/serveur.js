const express = require('express');
const cors = require('cors')
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const http = require('http');
const https = require('https');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname, { dotfiles: 'allow' } ));
app.use(express.static(path.join(__dirname + '/build')));
require('./routes/routes')(app);


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const privateKey  = fs.readFileSync(path.join(path.dirname(process.execPath)+'/https', 'server.key'))
const certificate = fs.readFileSync(path.join(path.dirname(process.execPath)+'/https', 'server.crt'))

const credentials = {key: privateKey, cert: certificate};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(5555);
httpsServer.listen(5556);

module.exports = app;
