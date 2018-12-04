var express = require('express');
var app = express();
var dotenv = require('dotenv');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var WashingMachine = require('./models/washingmachine');


// Configure env variables
dotenv.config();

mongoose.connect(process.env.DBURL);
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function() {
	console.log('Connected to database successfully');
});

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

app.post('/getBlockWashingMachines', function(req,res,next) {
	var block = req.body.block;
	WashingMachine.find({block : block}).exec((err,result)=>{
		if(err) return console.log(err);
		if(!result){
			console.log("Did not find any washing machine that matches query");
			return res.status(204).send("Did not find any washing machine that matches query");
		}
		console.log(result);
		return res.status(200).json(result);
	})
})

app.post('/addWashingMachine', function(req,res,next) {
	var id = req.body.id;
	var block = req.body.block;
	var machineStatus = req.body.machineStatus;
	var machineBackgroundColor = req.body.machineBackgroundColor;
	var text = req.body.text;

	var newWashingMachine = new WashingMachine({
		machineId : id,
		block : block,
		machineStatus : machineStatus,
		machineBackgroundColor : machineBackgroundColor,
		text : text
	})

	newWashingMachine.save((err) => {
		if (err) return console.log(err);
		console.log('New washingMachine added ' + 'washing machine ' + id + ' for block ' + block);
		return res.status(200).send('New washingMachine added ' + 'washing machine ' + id + ' for block ' + block);
	})

})


app.post('/machineStatus', function(req,res,next) {
	console.log(req.body);
	var machineId = req.body.machineId;
	var machineStatus = req.body.machineStatus;
	var machineBackgroundColor = req.body.machineBackgroundColor;
	var text = req.body.text;

	var data = {
		machineId : machineId,
		machineStatus : machineStatus,
		machineBackgroundColor : machineBackgroundColor,
		text : text
	}
	io.sockets.emit('machineStatus', data);

	console.log("Washing machine " + machineId + " is " + machineStatus);
	return res.status(200).send("Printer status received");
})
