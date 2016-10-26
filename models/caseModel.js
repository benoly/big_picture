var mongoose = require('mongoose');
var clientModel = require('./clientModel.js');

var caseSchema = new mongoose.Schema({
  name: {type: String, required: true},
  court: String,
  judge: String,
  causeNo: String,
  opposingCounsel: String,
  client: [{type: mongoose.Schema.Types.ObjectId, ref: "Client"}],
  caseDesc: String,
  trial: [{
    beginDate: Date,
    endDate: Date,
    description: String
  }],
  event: [{
    date: Date,
    title: String,
    description: String
  }]
  // witDisc: [{
  //   date: Date,
  //   description: String
  // }],
  // expertDiscl: [{
  //   date: Date,
  //   description: String
  // }],
  // discovery: [{
  //   date: Date,
  //   description: String
  // }],
  // plDiscovery: [{
  //   date: Date,
  //   description: String
  // }],
  // defDiscovery: [{
  //   date: Date,
  //   description: String
  // }],
  // motions: [{
  //   date: Date,
  //   description: String
  // }],
  // discMotions: [{
  //   date: Date,
  //   description: String
  // }],
  // dispMotions: [{
  //   date: Date,
  //   description: String
  // }],
  // nonDispMotions: [{
  //   date: Date,
  //   description: String
  // }],
  // motLim: [{
  //   date: Date,
  //   description: String
  // }],
  // mediation: [{
  //   date: Date,
  //   description: String
  // }],
  // mediatorSelect: [{
  //   date: Date,
  //   description: String
  // }],
  // pretConsult: [{
  //   date: Date,
  //   description: String
  // }],
  // pretExchange: [{
  //   date: Date,
  //   description: String
  // }],
  // finPretOrder: [{
  //   date: Date,
  //   description: String
  // }],
  // trialBrf: [{
  //   date: Date,
  //   description: String
  // }],
  // jurInst: [{
  //   date: Date,
  //   description: String
  // }],
  // witList: [{
  //   date: Date,
  //   description: String
  // }],
  // exhList: [{
  //   date: Date,
  //   description: String
  // }],
  // depoDesig: [{
  //   date: Date,
  //   description: String
  // }],
});

module.exports = mongoose.model('Case', caseSchema);
