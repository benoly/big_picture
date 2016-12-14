angular.module("bigPicture")
.service("mainServ", function($http){

  this.newCase = function(){
    return {
    events: [{
      title: "Join/Amend Deadline",
      nickname: "Join/Amend"
    },
    {
      title: "Witness Disclosure Deadline",
      nickname: "Wit. Dis."
    },
    {
      title: "Exp. Witness Disclosure Deadline",
      nickname: "Exp. Wit. Dis."
    },
    {
      title: "Discovery Deadline",
      nickname: "Discovery"
    },
    {
      title: "Plaintiff Discovery Deadline",
      nickname: "Pl. Disco."
    },
    {
      title: "Defendant Discovery Deadline",
      nickname: "Def. Disco."
    },
    {
      title: "Motions Deadline",
      nickname: "Motions"
    },
    {
      title: "Discovery Motions Deadline",
      nickname: "Disco. Mots."
    },
    {
      title: "Dispositive Mots. Deadline",
      nickname: "Dispo. Mots."
    },
    {
      title: "Non-Dispositive Mots. Deadline",
      nickname: "Non-Dispo. Mots."
    },
    {
      title: "Motions in Limine Deadline",
      nickname: "Mots. Lim."
    },
    {
      title: "Mediation Deadline",
      nickname: "Mediation"
    },
    {
      title: "Mediator Select Deadline",
      nickname: "Mediator Sel."
    },
    {
      title: "Pretrial Consultation Deadline",
      nickname: "Pret. Consult."
    },
    {
      title: "Pretrial Exchange Deadline",
      nickname: "Pret. Exch."
    },
    {
      title: "Final Pret. Order Deadline",
      nickname: "FPTO"
    },
    {
      title: "Final Pret. Conference",
      nickname: "FPTC"
    },
    {
      title: "Trial Brief Deadline",
      nickname: "Trial Brief"
    },
    {
      title: "Jury Instructions Deadline",
      nickname: "Jury Inst."
    },
    {
      title: "Trial Witn. List Deadline",
      nickname: "Tr. Witn. List"
    },
    {
      title: "Trial Exh. List Deadline",
      nickname: "Tr. Exh. List"
    },
    {
      title: "Deposition Desig. Deadline",
      nickname: "Depo. Desig."
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

  this.changeTheCase = function(caseToChange){
  console.log(caseToChange);
  return $http({
    method: "PUT",
    url: "/case/" + caseToChange._id,
    data: caseToChange
  }).then(function(response){
    console.log(response)
    return response;
  })
};

  this.destroyTheCase = function(caseToDestroy){
  return $http({
    method: "DELETE",
    url: "/case/" + caseToDestroy._id,
  }).then(function(response){
    return response;
  })
};

});
