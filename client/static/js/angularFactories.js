comicApp.factory('UserFactory', function($http){
	var factory = {};

	factory.create = function(info, callback, errcallback){
		$http.post('/users', info)
			.success(function(output){
				factory.loggedUser = output;
				callback(output);
			})
			.error(function(error){
				errcallback(error);
			});
	}

	factory.newGuest = function(callback){
		var guest = {username: "Guest", _id: "Guest"};
		factory.loggedUser = guest;
		callback();
	}

	factory.login = function(info, callback, errcallback){
		if(info == undefined){
			error = {errors: {regUsername: {kind: "required", message: "Please fill-in username"}, regPassword: 
				{kind: "required", message: "Please type in password"}}};
			errcallback(error);
			return factory;
		}
		if(info.regUsername == undefined){
			error = {errors: {regUsername: {kind: "required", message: "Please fill-in username"}}};
			errcallback(error);
			return factory;
		}
		if(info.regPassword == undefined){
			error = {errors: {regPassword: {kind: "required", message: "Please type in password"}}};
			errcallback(error);
			return factory;
		}
		var username = info.regUsername;
		$http.post('/users/'+ username, info)
			.success(function(output){
				factory.loggedUser = output;
				callback(output);
			})
			.error(function(error){
				errcallback(error);
			})
	}

	factory.logout = function(callback){
		factory.loggedUser = {};
		callback();
	}

	return factory;
})


comicApp.factory('GradeFactory', function($http){
	var factory = {};

	factory.create = function(info, callback){
		$http.post('/grades', info).success(function(output){
			callback(output);
		})
	}

	return factory;
})

comicApp.factory('ForumFactory', function($http){
	var factory = {};

	factory.index = function(categories, callback){
		// console.log(categories);
		// console.log(categories.category);
		// console.log(categories.subcategory);
		if(categories.category == undefined){
			// console.log("i'm in the if");
			$http.get('/topics').success(function(output){
				// console.log(output);
				callback(output);
			})			
		}
		else if(categories.subcategory == undefined){
			// console.log("i'm in the else if");
			$http.get('/topics/' +  categories.category).success(function(output){
				// console.log(output);
				callback(output);
			})
		}
		else {
			// console.log("i'm in the else");
			$http.get('/topics/' + categories.category + '/' + categories.subcategory).success(function(output){
				// console.log(output);
				callback(output);
			})
		}
	}

	factory.createTopic = function(topic, callback, errcallback){
		$http.post('/topics', topic)
			.success(function(topic){
				callback(topic);
			})
			.error(function(error){
				// console.log(error);
				errcallback(error);
			});
	}

	return factory;
})

comicApp.factory('PostFactory', function($http){
	var factory = {};

	factory.index = function(topic, callback){
		// console.log(topic);
		$http.get('/posts/' + topic).success(function(output){
			// console.log(output);
			callback(output);
		})
	}

	factory.create = function(post, callback, errcallback){
		$http.post('/posts', post)
			.success(function(post){
				callback(post);
			})
			.error(function(error){
				errcallback(error);
			})
	}

	return factory;
})

comicApp.factory('CommentFactory', function($http){
	var factory = {};

	factory.index = function(post, callback){
		$http.get('/comments/' + post).success(function(output){
			console.log(output);
			callback(output);
		})
	}

	factory.create = function(comment, callback, errcallback){
		$http.post('/comments', comment)
			.success(function(comment){
				callback(comment);
			})
			.error(function(error){
				errcallback(error);
			})
	}

	return factory;
})