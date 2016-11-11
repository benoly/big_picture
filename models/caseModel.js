var mongoose = require('mongoose');
// var clientModel = require('./clientModel.js');

var caseSchema = new mongoose.Schema({
  name: {type: String, required: true},
  court: String,
  judge: String,
  causeNo: String,
  assignedCounsel: String,
  opposingCounsel: String,
  clientName: String,
  clientEmail: String,
  clientNumber:String,
  caseDesc: String,
  schedConf: Date,
  trial: {
    beginDate: Date,
    endDate: Date,
    description: String,
    included: {type: Boolean, default: false}
  },
  events: [{
    title: String,
    nickname: String,
    date: Date,
    description: String,
    included: {type: Boolean, default: false}
  }]
});

module.exports = mongoose.model('Case', caseSchema);
