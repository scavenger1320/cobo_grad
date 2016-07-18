var comicApp = angular.module('comicApp', ['ngRoute']);

comicApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'views/partials/home.html'
		})
		.when('/login', {
			templateUrl: 'views/partials/login.html'
		})
		.when('/dashboard', {
			templateUrl: 'views/partials/dashboard.html'
		})
		.when('/accuracy1', {
			templateUrl: 'views/partials/accuracy1.html'
		})
		.when('/accuracy2', {
			templateUrl: 'views/partials/accuracy2.html'
		})
		.when('/accuracy3', {
			templateUrl: 'views/partials/accuracy3.html'
		})
		.when('/forum', {
			templateUrl: 'views/partials/forum.html'
		})
		.when('/forum/:category', {
			templateUrl: function(params){
				if(params.category == 'coboGradNews'){
					return 'views/partials/coboGradNews.html';
				}
				else if(params.category == 'generalDiscussion'){
					return 'views/partials/generalDiscussion.html';
				}
				else if(params.category == 'comicBooks'){
					return 'views/partials/comicBooks.html';
				}
				else if(params.category == 'random'){
					return 'views/partials/random.html';
				}
			}
		})
		.when('/forum/:category/:subcategory', {
			templateUrl: 'views/partials/subcategory.html'
		})
		.when('/forum/:category/:subcategory/:_id', {
			templateUrl: 'views/partials/post.html'
		})
		.otherwise({
			redirectTo: '/'
		});
})