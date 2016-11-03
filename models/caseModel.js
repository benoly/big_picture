var mongoose = require('mongoose');
// var clientModel = require('./clientModel.js');

var caseSchema = new mongoose.Schema({
  name: {type: String, required: true},
  court: String,
  judge: String,
  causeNo: String,
  opposingCounsel: String,
  clientName: String,
  clientEmail: String,
  clientNumber:String,
  caseDesc: String,
  schedConf: Date,
  trial: {
    beginDate: Date,
    endDate: Date,
    description: String
  },
  events: [{
    title: String,
    nickname: String,
    date: Date,
    description: String
  }]
});

module.exports = mongoose.model('Case', caseSchema);
