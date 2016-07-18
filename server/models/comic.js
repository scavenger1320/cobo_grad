var mongoose = require('mongoose');

var ComicSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	grade: {
		type: String
	}
})

mongoose.model('Comic', ComicSchema);