var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(){
	return {
		create: function(req, res){
			if(req.body.password != req.body.confirm){
				error = {errors: {confirm: {kind: "matchPW", message: "Passwords do not match"}}};
				res.status(400);
				res.json(error);
			}
			else{
				var newUser = new User(req.body);
				newUser.save(function(error){
					if(error){
						res.status(400);
						res.json(error)
					}
					else{
						var loggedUser = {username: newUser.username, _id: newUser._id};
						res.json(loggedUser);
					}
				})	
			}
		},
		show: function(req,res){
			User.findOne({username: req.params.username}, function(error, data){
				if(error){
					res.status(400);
					res.json(error);
				}
				else{
					if(data == null){
						error = {errors: {regPassword: {kind: "wrong", message: "Username or Password is incorrect"}}};
						res.status(400);
						res.json(error);
					}
					else if(data.password == req.body.regPassword){
						var loggedUser = {username: data.username, _id: data._id};
						res.json(loggedUser);
					}
					else{
						error = {errors: {regPassword: {kind: "wrong", message: "Username or Password is incorrect"}}};
						res.status(400);
						res.json(error);
					}
				}
			})
		}
	}
}();