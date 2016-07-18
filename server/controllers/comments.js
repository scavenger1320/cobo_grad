var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Post = mongoose.model('Post');
// var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

module.exports = function(){
	return {
		index: function(req, res){
			console.log(req.params);
			Comment.find({_post: req.params.id})
				.lean()
				.populate('_post')
				.populate('_user')
				.exec(function(error,comments){
					if(error){
						console.log(error)
					}
					else {
						console.log(comments);
						res.json(comments);
					}
				})
		},
		create: function(req, res){
			var newComment = new Comment(req.body);
			User.findOne({_id: newComment._user}, function(error, user){
				Post.findOne({_id: newComment._post}, function(error, post){
					newComment.save(function(error, comment){
						if(error){
							res.status(400);
							res.json(error);
						}
						else{
							post.comments.push(newComment);
							post.save(function(error, post){
								if(error){
									res.status(400);
									res.json(error);
								}
								else{
									user.comments.push(newComment);
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