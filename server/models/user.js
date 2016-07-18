var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: [true, 'Gotta have a first name!'],
	},
	last_name: {
		type: String,
		required: [true, 'Gotta have a last name!']
	},
	username: {
		type: String,
		required: [true, 'We need to know what to call you!'],
		minlength: [4, 'Usernames have to be at least 4 characters long'],
		unique: true
	},
	email: {
		type: String,
		required: [true, 'How are we supposed to bug you without an e-mail address?'],
		match: [/\S+@\S+\.\S+/, 'That e-mail is not valid']
	},
	password: {
		type: String,
		required: [true, 'Not gonna be very secure without a password'],
		minlength: [8, "Password is too easy to hack if you have less than 8 characters"]
	},
	comics: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comic"
	}],
	topics: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Topic"
	}],
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	}],
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}],
	created_at: {
		type: Date,
		default: Date.now
	}
})

UserSchema.plugin(uniqueValidator, {message: 'Sorry, but that Username is already taken'});
mongoose.model('User', UserSchema);