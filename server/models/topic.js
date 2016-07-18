var mongoose = require('mongoose');

var TopicSchema = new mongoose.Schema({
	category: {
		type: String
	},
	subcategory: {
		type: String
	},
	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	title: {
		type: String,
		required: [true, "Can't post without an actual topic!"]
	},
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	}],
	views: {
		type: Number,
		default: 0
	},
	created_at: {
		type: Date,
		default: Date.now
	}
})

mongoose.model('Topic', TopicSchema);