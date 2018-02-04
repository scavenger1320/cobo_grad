const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = express();

app.use(express.static(path.join(__dirname + '/client')));
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// connect to mongo db and 
require('./server/config/mongoose.js');
const routes = require('./server/config/routes.js')(app);

// start server
app.listen(8000, () => {
	console.log('Port 8000 Alive and Well');
})