const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
mongoose.Promise = global.Promise;

// connect to db
mongoose.connect('mongodb://localhost/cobo_grad', { useMongoClient: true, promiseLibrary: global.Promise });

const models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js')>0){
		require(models_path + '/' + file);
	}
});