var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

module.exports = function(){
	return {
		index: function(req, res){
			// console.log(req);
			Topic.findOne({_id: req.params.id}, function(error, topic){
				Post.find({_topic: req.params.id})
					.lean()
					.populate('_topic')
					.populate('_user')
					.populate('comments')
					.exec(function(error,posts){
						if(error){
							console.log(error)
						}
						else {
							// console.log(posts);
							topic.views++;
							topic.save({}, function(error){
								if(error){
									console.log(error);
								}
								else {
									res.json(posts);
								}
							})
						}
					})
			})
		},
		create: function(req, res){
			var newPost = new Post(req.body);
			User.findOne({_id: newPost._user}, function(error, user){
				Topic.findOne({_id: newPost._topic}, function(error, topic){
					newPost.save(function(error, post){
						if(error){
							res.status(400);
							res.json(error);
						}
						else{
							topic.posts.push(newPost);
							topic.save(function(error, topic){
								if(error){
									res.status(400);
									res.json(error);
								}
								else{
									user.posts.push(newPost);
									user.save(function(error, user){
										if(error){
											res.status(400);
											res.json(error);
										}
										else {
											res.json(user);
										}
									})
								}
							})
						}
					})
				})
			})
		}
	}
}();