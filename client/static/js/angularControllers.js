comicApp.controller('HomeController', function(){

});

comicApp.controller('UsersController', function(UserFactory, $location){
	this.validationError = null;
	var self = this;
	if(UserFactory.loggedUser){
		self.loggedUser = UserFactory.loggedUser;
	}
	// else{
	// 	$location.url('/');
	// }
	this.addGuest = function(){
		UserFactory.newGuest(function(){
			$location.url('/dashboard');
		})
	}
	this.addUser = function(){
		self.validationError = null;
		UserFactory.create(this.newUser, function(data){
			self.newUser = {};
			$location.url('/dashboard');
		},
		function(error){
			self.validationError = error;
			// console.log(self.validationError);
		})
	}
	this.verifyUser = function(){
		self.validationError = null;
		UserFactory.login(this.regUser, function(data){
			self.regUser = {};
			$location.url('/dashboard');
		},
		function(error){
			self.regUser = {};
			self.validationError = error;
		})
	}
	this.logout = function(){
		UserFactory.logout(function(){
			$location.url('/');
		});
	}
});

comicApp.controller('GradesController', function(GradeFactory, UserFactory, $location){
	if(UserFactory.loggedUser){
		this.loggedUser = UserFactory.loggedUser;
	}
	else{
		$location.url('/');
	}
	var self = this;
	this.getGrade = function(){
		GradeFactory.create(this.newGrade, function(data){
			this.newGrade = '';
			self.grade = data;
		})
	}
	// getGrade2 method is temporary and needs additional details and put logic in server
	this.getGrade2 = function(){
		// GradeFactory.create(this.newGrade, function(data){
		// 	this.newGrade = '';
		// 	self.grade = data;
		// })
		var rank = 0;
		rank += this.newGrade.cover*1 + this.newGrade.tears*1;
		if(rank == 0){
			self.grade = "Excellent";
		}
		else if(rank == 1 ){
			self.grade = "Good"
		}
		else if(rank <= 3){
			self.grade = "Not Good"
		}
		else{
			self.grade = "REALLY BAD";
		}
		this.newGrade = '';
	}
	this.logout = function(){
		UserFactory.logout(function(){
			$location.url('/');
		});
	}
});

comicApp.controller('ForumsController', function(ForumFactory, UserFactory, $location, $routeParams){
	this.category = $routeParams.category;
	this.subcategory = $routeParams.subcategory;
	this.validationError = null;
	if(UserFactory.loggedUser){
		this.loggedUser = UserFactory.loggedUser;
	}
	else{
		$location.url('/');
	}
	var self = this;
	function getTopics(){
		var categories = {};
		categories.category = self.category;
		categories.subcategory = self.subcategory;
		ForumFactory.index(categories, function(data){
			self.topics = data;

		})
	}

	getTopics();

	// this.categoryFilter = function()

	// function getTopicsByCategory(){
	// 	ForumFactory.index(this.category, function(data){
	// 		self.topics = data;
	// 	})
	// }

	// getTopicsByCategory();

	this.addTopic = function(){
		if(this.newTopic == undefined){
			error = {errors: {title: {kind: "required", message: "Can't post without an actual topic!"}, post: 
				{kind: "required", message: "Gotta have some sort of post for your topic"}}};
			self.validationError = error;
		}
		else {
			this.newTopic._user = this.loggedUser._id;
			this.newTopic.category = this.category;
			this.newTopic.subcategory = this.subcategory;
			self.validationError = null;
			ForumFactory.createTopic(this.newTopic, function(data){
				self.category = data.category;
				self.subcategory = data.subcategory;
				self.newTopic = {};
				// $location.url('/' + data.category + '/' + data.subcategory);
				getTopics();
			},
			function(error){
				self.validationError = error;
				// console.log(self.validationError);
			})
		}
	}
	this.logout = function(){
		UserFactory.logout(function(){
			$location.url('/');
		});
	}
})

comicApp.controller('PostsController', function(PostFactory, UserFactory, $location, $routeParams){
	this.category = $routeParams.category;
	this.subcategory = $routeParams.subcategory;
	this.validationError = null;
	if(UserFactory.loggedUser){
		this.loggedUser = UserFactory.loggedUser;
	}
	else{
		$location.url('/');
	}
	var self = this;
	function getPosts(){
		// var categories = {};
		// categories.category = self.category;
		// categories.subcategory = self.subcategory;
		// console.log(categories);
		// console.log($routeParams._id);
		var topic = $routeParams._id;
		PostFactory.index(topic, function(data){
			self.posts = data;
		})
	}
	getPosts();

	this.addPost = function(){
		this.newPost._user = this.loggedUser._id;
		this.newPost._topic = $routeParams._id;
		// console.log($routeParams);
		// console.log(this.newPost);
		// console.log(this.newPost._topic);
		self.validationError = null;
		PostFactory.create(this.newPost, function(data){
			// console.log(data);
			// self.category = data.category;
			// self.subcategory = data.subcategory;
			self.newPost = {};
			// $location.url('/' + data.category + '/' + data.subcategory);
			getPosts();
		},
		function(error){
			self.validationError = error;
			console.log(self.validationError);
		})
	}

	this.logout = function(){
		UserFactory.logout(function(){
			$location.url('/');
		});
	}
})

comicApp.controller('CommentsController', function(CommentFactory, UserFactory, $location, $routeParams){
	// console.log($routeParams);
	// console.log($routeParams.category);
	// console.log($routeParams.subcategory);
	// this.category = $routeParams.category;
	// this.subcategory = $routeParams.subcategory;
	this.validationError = null;
	if(UserFactory.loggedUser){
		this.loggedUser = UserFactory.loggedUser;
	}
	// else{
	// 	$location.url('/');
	// }
	var self = this;
	function getComments(post){
		// var categories = {};
		// categories.category = self.category;
		// categories.subcategory = self.subcategory;
		// console.log(categories);
		// console.log(post);
		// var post = $routeParams._id;
		CommentFactory.index(post, function(data){
			self.comments = data;
		})
	}
	// getComments();

	this.addComment = function(postId){
		this.newComment._user = this.loggedUser._id;
		this.newComment._post = postId;
		// console.log($routeParams);
		// console.log(this.newPost);
		// console.log(this.newPost._topic);
		// console.log(this.newComment);
		self.validationError = null;
		CommentFactory.create(this.newComment, function(data){
			// console.log(data);
			// self.category = data.category;
			// self.subcategory = data.subcategory;
			self.newComment = {};
			// $location.url('/forum/' + $routeParams.category + '/' + $routeParams.subcategory + '/' + $routeParams._id);
			// console.log(postId);
			getComments(postId);
		},
		function(error){
			self.validationError = error;
			console.log(self.validationError);
		})
	}

	// this.logout = function(){
	// 	UserFactory.logout(function(){
	// 		$location.url('/');
	// 	});
	// }
})





