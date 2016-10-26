var ClientModel = require('./../models/clientModel.js');

module.exports = {

  read: function(req, res){
    ClientModel
      .find(req.query)
      .exec(function(err, result){
        if(err){
          res.send(err);
        } else {
          res.send(result);
        }
      })
  },

  create: function(req, res){
    var client = new ClientModel(req.body);
    client.save(function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    })
  },

  update: function(req, res){
    ClientModel.findByIdAndUpdate(req.params.id, req.body, function(err, result){
          //the id in this line should line up with the id in the index.js app.push; so if it said "key" in the index.js, use "key" here
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    })
  },

  destroy: function(req, res){
    ClientModel
    .findByIdAndRemove(req.params.id, req.body, function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    })
  }

};
