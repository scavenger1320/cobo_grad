var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	_post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	},
	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	comment: {
		type: String,
		required: [true, "You can't really reply with nothing, unless you serve the faceless god!"]
	},
	created_at: {
		type: Date,
		default: Date.now
	}
})

mongoose.model('Comment', CommentSchema);