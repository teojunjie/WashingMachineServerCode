var express = require('express');
var app = express();
var dotenv = require('dotenv');
var bodyParser = require('body-parser');


// Configure env variables
dotenv.config();

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('port', process.env.PORT);
var server = app.listen(app.get('port'), function() {
	console.log('Washing machine server listening on port ' + server.address().port);
})

var io = require('socket.io')(server);

io.on('connection', function(socket) {
	console.log('A new device has connected');
	console.log(socket.id);
})

// Set Routes
app.get('/', function(req,res,next) {
	console.log("Ping gh server");
	res.sendFile(__dirname + '/welcomepage.html');
})
app.post('/machineStatus', function(req,res,next) {
	console.log(req.body);
	var machineName = req.body.machineName;
	var machineStatus = req.body.machineStatus;

	io.sockets.emit('machineStatus', {machineName : machineName ,machineStatus : machineStatus});

	console.log(machineName + " is " + machineStatus);
	return res.status(200).send("Printer status received");
})
