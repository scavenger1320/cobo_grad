var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	_topic: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Topic"
	},
	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	content: {
		type: String,
		required: [true, "You can't really reply with nothing, unless you serve the faceless god!"]
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}],
	created_at: {
		type: Date,
		default: Date.now
	}
})

mongoose.model('Post', PostSchema);