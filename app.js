var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

//middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
	extended: true}
	));
app.use(morgan('tiny'));

app.listen(3000, function(){
	console.log("knwewjfnjfnnf");
});