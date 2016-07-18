var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname + '/client')));
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require('./server/config/mongoose.js');
var routes = require('./server/config/routes.js')(app);

app.listen(8000, function(){
	console.log("Port 8000 Alive and Well");
})