angular.module("bigPicture")
.controller("mainCtrl", function($scope, mainServ){

$scope.newCase = mainServ.newCase();

$scope.postNewCase = function(nextCase){
  for (var i = 0; i < nextCase.events.length; i++) {
    if(!nextCase.events[i].description && !nextCase.events[i].date){
      nextCase.events.splice(i,1);
      i--;
    }
  }

  mainServ.addNewCase(nextCase)
    .then(function(response){
      // console.log(response)
      $scope.getCases();
      document.getElementById('addNewModal').style.display = "none";
      $scope.newCase = mainServ.newCase();
      $scope.check1 = false;
    });
};

$scope.getCases = function(){
    mainServ.getAllTheCases()
      .then(function(response){
        console.log(response);
        $scope.allTheCases = response;
        $scope.beginDate = $scope.allTheCases[0].schedConf;
        for (var j = 0; j < $scope.allTheCases.length; j++) {
          if(moment($scope.allTheCases[j].schedConf) < moment($scope.beginDate)){
            $scope.beginDate = $scope.allTheCases[j].schedConf;
            console.log($scope.beginDate);
          }
        }

        $scope.todaysDateX =
        moment().diff(moment($scope.beginDate), 'days');
        console.log($scope.todaysDateX);

        for (var k = 0; k < $scope.allTheCases.length; k++) {
          $scope.allTheCases[k].schedConfX = moment($scope.allTheCases[k].schedConf).diff(moment($scope.beginDate),'days');
          // console.log($scope.allTheCases[k].schedConfX);

          for (var l = 0; l < $scope.allTheCases[k].events.length; l++){
            if($scope.allTheCases[k].events[l].title === "Join/Amend Deadline"){
              $scope.allTheCases[k].joinAmendX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].joinAmendX);
            }
            if($scope.allTheCases[k].events[l].title === "Witness Disclosure Deadline"){
              $scope.allTheCases[k].witDisclX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].witDisclX);
            }
            if($scope.allTheCases[k].events[l].title === "Exp. Witness Disclosure Deadline"){
              $scope.allTheCases[k].expWitDisclX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].expWitDisclX);
            }
            if($scope.allTheCases[k].events[l].title === "Discovery Deadline"){
              $scope.allTheCases[k].discoX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].discoX);
            }
            if($scope.allTheCases[k].events[l].title === "Plaintiff Discovery Deadline"){
              $scope.allTheCases[k].plDiscoX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].plDiscoX);
            }
            if($scope.allTheCases[k].events[l].title === "Defendant Discovery Deadline"){
              $scope.allTheCases[k].defDiscoX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].defDiscoX);
            }
            if($scope.allTheCases[k].events[l].title === "Motions Deadline"){
              $scope.allTheCases[k].motsX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].motsX);
            }
            if($scope.allTheCases[k].events[l].title === "Discovery Motions Deadline"){
              $scope.allTheCases[k].discoMotsX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].discoMotsX);
            }
            if($scope.allTheCases[k].events[l].title === "Dispositive Mots. Deadline"){
              $scope.allTheCases[k].dispoMotsX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].dispoMotsX);
            }
            if($scope.allTheCases[k].events[l].title === "Non-Dispositive Mots. Deadline"){
              $scope.allTheCases[k].nonDispoMotsX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].nonDispoMotsX);
            }
            if($scope.allTheCases[k].events[l].title === "Motions in Limine Deadline"){
              $scope.allTheCases[k].motsLimX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].motsLimX);
            }
            if($scope.allTheCases[k].events[l].title === "Mediation Deadline"){
              $scope.allTheCases[k].medX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].medX);
            }
            if($scope.allTheCases[k].events[l].title === "Mediator Select Deadline"){
              $scope.allTheCases[k].medSelectX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].medSelectX);
            }
            if($scope.allTheCases[k].events[l].title === "Pretrial Consultation Deadline"){
              $scope.allTheCases[k].pretConsultX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].pretConsultX);
            }
            if($scope.allTheCases[k].events[l].title === "Pretrial Exchange Deadline"){
              $scope.allTheCases[k].pretExchX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].pretExchX);
            }
            if($scope.allTheCases[k].events[l].title === "Final Pret. Order Deadline"){
              $scope.allTheCases[k].pretOrdX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].pretOrdX);
            }
            if($scope.allTheCases[k].events[l].title === "Final Pret. Conference"){
              $scope.allTheCases[k].pretConfX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].pretConfX);
            }
            if($scope.allTheCases[k].events[l].title === "Trial Brief Deadline"){
              $scope.allTheCases[k].trBrfX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].trBrfX);
            }
            if($scope.allTheCases[k].events[l].title === "Jury Instructions Deadline"){
              $scope.allTheCases[k].juryInstX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].juryInstX);
            }
            if($scope.allTheCases[k].events[l].title === "Trial Witn. List Deadline"){
              $scope.allTheCases[k].trWitX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].trWitX);
            }
            if($scope.allTheCases[k].events[l].title === "Trial Exh. List Deadline"){
              $scope.allTheCases[k].trExhX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].trExhX);
            }
            if($scope.allTheCases[k].events[l].title === "Deposition Desig. Deadline"){
              $scope.allTheCases[k].depoDesigX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
              // console.log($scope.allTheCases[k].depoDesigX);
            }
          }

        if($scope.allTheCases[k].trial.beginDate){
          $scope.allTheCases[k].trBeginX =
          moment($scope.allTheCases[k].trial.beginDate).diff(moment($scope.beginDate), 'days');
          $scope.allTheCases[k].trLength =
          moment($scope.allTheCases[k].trial.endDate).diff(moment($scope.allTheCases[k].trial.beginDate), 'days');
        }

        // $scope.allTheCases[k].trial.diff = moment($scope.allTheCases[k].trial.endDate).diff(moment($scope.allTheCases[k].trial.beginDate),'days');

        }
    });
  };
  $scope.getCases();
});
