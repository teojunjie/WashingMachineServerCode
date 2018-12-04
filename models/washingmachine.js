var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WashingMachineSchema = new Schema({
  block : String,
  machineId : Number,
  machineStatus : String,
  machineBackgroundColor : String,
  text : String
}, {collections: 'WashingMachines'});

module.exports = mongoose.model('WashingMachines', WashingMachineSchema);
