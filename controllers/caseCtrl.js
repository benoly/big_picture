var CaseModel = require('./../models/caseModel.js');

module.exports = {

  create: function(req, res){
    var Case = new CaseModel(req.body);
    Case.save(function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    })
  },

  read: function(req, res){
    CaseModel
      .find(req.query)
      // .populate('client')
      .exec(function(err, result){
        if(err){
          res.send(err);
        } else {
          res.send(result);
        }
      })
  },

  update: function(req, res){
    CaseModel.findByIdAndUpdate(req.params.id, req.body, function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    })
  },

  destroy: function(req, res){
    CaseModel
    .findByIdAndRemove(req.params.id, req.body, function(err, result){
      if(err){
        res.send(err);
      } else {
        res.send(result);
      }
    })
  }

};
