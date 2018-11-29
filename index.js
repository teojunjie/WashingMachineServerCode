var express = require('express');
var app = express();
var dotenv = require('dotenv');

//Configure env variables
dotenv.config();

app.set('port', process.env.PORT);
var server = app.listen(app.get('port'), function() {
	console.log('Washing machine server listening on port ' + server.address().port);
})

