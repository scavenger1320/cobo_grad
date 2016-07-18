var mongoose = require('mongoose');

var GradeSchema = new mongoose.Schema({
	minGrade: {
		type: String
	},
	maxGrade: {
		type: String
	}
})

mongoose.model('Grade', GradeSchema);