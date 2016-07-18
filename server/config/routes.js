var users = require('./../controllers/users.js');
var comics = require('./../controllers/comics.js');
var grades = require('./../controllers/grades.js');
var topics = require('./../controllers/topics.js');
var posts = require('./../controllers/posts.js');
var comments = require('./../controllers/comments.js');

module.exports = function(app){

	app.post('/users', users.create);

	app.post('/users/:username', users.show);

	app.post('/grades', grades.create);

	app.get('/topics', topics.index);

	app.get('/topics/:category', topics.index);

	app.get('/topics/:category/:subcategory', topics.index);

	app.post('/topics', topics.create);

	app.get('/posts/:id', posts.index);

	app.post('/posts', posts.create);

	app.get('/comments/:id', comments.index);

	app.post('/comments', comments.create);

}