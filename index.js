var express = require('express');
var app = express();
var dotenv = require('dotenv');
var bodyParser = require('body-parser');

// Import routes
var mainRouter = require('./routes/main');

// Configure env variables
dotenv.config();

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Set Routes
app.use('/', mainRouter);

app.set('port', process.env.PORT);
var server = app.listen(app.get('port'), function() {
	console.log('Washing machine server listening on port ' + server.address().port);
})

