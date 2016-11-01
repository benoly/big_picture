angular.module("bigPicture")
.service("mainServ", function($http){

  this.newCase = function(){
    return {
    events: [{
      title: "Join/Amend Deadline"
    },
    {
      title: "Witness Disclosure Deadline"
    },
    {
      title: "Exp. Witness Disclosure Deadline"
    },
    {
      title: "Discovery Deadline"
    },
    {
      title: "Plaintiff Discovery Deadline"
    },
    {
      title: "Defendant Discovery Deadline"
    },
    {
      title: "Motions Deadline"
    },
    {
      title: "Discovery Motions Deadline"
    },
    {
      title: "Dispositive Mots. Deadline"
    },
    {
      title: "Non-Dispositive Mots. Deadline"
    },
    {
      title: "Motions in Limine Deadline"
    },
    {
      title: "Mediation Deadline"
    },
    {
      title: "Mediator Select Deadline"
    },
    {
      title: "Pretrial Consultation Deadline"
    },
    {
      title: "Pretrial Exchange Deadline"
    },
    {
      title: "Final Pret. Order Deadline"
    },
    {
      title: "Final Pret. Conference"
    },
    {
      title: "Trial Brief Deadline"
    },
    {
      title: "Jury Instructions Deadline"
    },
    {
      title: "Trial Witn. List Deadline"
    },
    {
      title: "Trial Exh. List Deadline"
    },
    {
      title: "Deposition Desig. Deadline"
    }
  ]
  }
};

  this.addNewCase = function(anotherCase){
    return $http({
      method: "POST",
      url: "/case",
      data: anotherCase
    }).then(function(response){
      return response;
    })
  };

  this.getAllTheCases = function(){
  return $http({
    method: "GET",
    url: "/case"
  }).then(function(response){
    return response.data;
  })
};

});
