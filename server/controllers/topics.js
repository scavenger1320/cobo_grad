var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var moment = require('moment');

module.exports = function(){
	return {
		index: function(req, res){
			// console.log(req.params);
			// console.log(req.params.category);
			// console.log(req.params.subcategory);
			var search = {};
			// var search = {category: req.params.category, subcategory: req.params.subcategory}
			if(!req.params.category){
				search = {};
			}
			else if(!req.params.subcategory){
				search = {category: req.params.category};
			}
			else {
				search = {category: req.params.category, subcategory: req.params.subcategory};
			}
			// console.log(search);
			Topic.find(search)
				.lean()
				.populate('_user')
				.populate('posts')
				.sort({created_at: -1})
				.exec(function(error, topics){
					if(error){
						console.log(error);
					}
					else{
						// for(var idx = 0; idx < questions.length; idx++){
						// 	questions[idx].answerCount = questions[idx].answers.length;
						// }
						// console.log(topics);
						for(var idx = 0; idx < topics.length; idx++){
							var ago = moment(topics[idx].created_at).fromNow();
							topics[idx].timeago = ago;
							topics[idx].replies = topics[idx].posts.length - 1;
							// console.log(topics);
						}
						res.json(topics);
					}
				})
		},
		create: function(req, res){
			if(req.body.post == undefined){
				error = {errors: {post: {kind: "required", message: "Gotta have some sort of post for your topic!"}}};
				res.status(400);
				res.json(error);
			}
			else{
				var post = req.body.post;
				var newTopic = new Topic(req.body);
				User.findOne({_id: newTopic._user}, function(error,user){			
					newTopic.save(function(error, topic){
						if(error){
							res.status(400);
							res.json(error);
						}
						else {
							var newPost = new Post({_topic: topic._id, _user: topic._user, content: post});
							newPost.save(function(error, post){
								if(error){
									res.status(400);
									res.json(error);
								}
								else {
									topic.posts.push(newPost);
									topic.save(function(error, topic){
										if(error){
											res.status(400);
											res.json(error);
										}
										else {
											user.topics.push(newTopic);
											user.posts.push(newPost);
											user.save(function(error, user){
												if(error){
													console.log(error);
												}
												else {
													res.json(topic);
												}
											})		
										}
									})
								}
							})
						}
					})
				})
			}
		}
	}
}();