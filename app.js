var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var knex = require('./db/knex');
var methodOverride = require('method-override');
//middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
	extended: true}
	));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.get('/students', function(req,res){
	knex('students').then(function(students){
		res.render('index', {
			students: students
		});
	});
});

app.get('/students/new', function(req,res){
	res.render('new');
});

app.post('/students', function(req, res){
	knex('students').insert({
		name: req.body.studentName
		}).then(function(){
			res.redirect('/students');
	});

});

app.get('/students/:id/edit', function(req,res){
	knex('students').where({id: parseInt(req.params.id)}).first().then(function(student){
		res.render('edit', {student: student});
	});
});

app.put('/students/:id', function (req, res) {
	console.log(req.body);
	// update the student
	knex('students')
  	.where('id', '=', req.params.id).first()
  	.update({
    	name: req.body.studentName
  	}).then(function(){
  		// redirect to students
  		res.redirect('/students');
  	});
});

app.get('/students/:id/delete', function(req, res){
	knex('students').where({id: parseInt(req.params.id)}).first().then(function(student){
		res.render('show', {student: student});
	});
});

app.delete('/students/:id', function (req, res) {
	//find the student
	//delete the student
	//redirect to students
	knex('students')
  	.where('id', '=', req.params.id).first()
  	.del().then(function(){
  		// redirect to students
  		res.redirect('/students');
  	});
});
app.listen(3000, function(){
	console.log("knwewjfnjfnnf");
});