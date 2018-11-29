var express = require('express');
var router = express.Router();

router.post('/machineStatus', function(req, res, next) {

	console.log(req.body);
	var machineName = req.body.machineName;
	var machineStatus = req.body.machineStatus;

	console.log(machineName + " is " + machineStatus);
	return res.status(200).send("Printer status received");
});


module.exports = router;



