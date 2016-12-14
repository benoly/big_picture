const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var app = express();
var caseCtrl = require('./controllers/caseCtrl.js');

var moment = require('moment');
moment().format();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

app.get('/case', caseCtrl.read);
app.post('/case', caseCtrl.create);
app.put('/case/:id', caseCtrl.update);
app.delete('/case/:id', caseCtrl.destroy);

mongoose.connect('mongodb://localhost: 27017/caseDB');
mongoose.connection.once('open', function(){
  console.log("Connected to mongoDB");
});

app.listen(8000, function(){
  console.log("listening for signs of life at 8000");
});
