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
      document.getElementById('addNewModal').style.display = "none";
      $scope.newCase = mainServ.newCase();
      $scope.check1 = false;
      // $scope.getCases();
      location.reload(); //remove later
    });
};

$scope.getCases = function(){
    mainServ.getAllTheCases()
      .then(function(response){
        // console.log(response);
        $scope.allTheCases = response;

        $scope.todaysDate = moment().format('L');

        $scope.beginDate = $scope.allTheCases[0].schedConf;
        for (var j = 0; j < $scope.allTheCases.length; j++) {
          if(moment($scope.allTheCases[j].schedConf) < moment($scope.beginDate)){
            $scope.beginDate = $scope.allTheCases[j].schedConf;
          }
        }

        $scope.todaysDateX = (moment().diff(moment($scope.beginDate), 'days')) * 2.5 + 10;

        $scope.latestEndDate = $scope.todaysDate;

        document.body.scrollLeft = ($scope.todaysDateX) - (window.outerWidth/2);

        for (var k = 0; k < $scope.allTheCases.length; k++) {

          $scope.allTheCases[k].schedConfX = moment($scope.allTheCases[k].schedConf).diff(moment($scope.beginDate),'days') * 2.5 + 10;

          $scope.allTheCases[k].lineEndDate = $scope.allTheCases[k].schedConf;

          $scope.allTheCases[k].latestEndDateForCase = $scope.allTheCases[k].schedConf;

          if($scope.allTheCases[k].trial){
            $scope.allTheCases[k].trial.beginDate = moment($scope.allTheCases[k].trial.beginDate).format('L');
            $scope.allTheCases[k].trial.endDate = moment($scope.allTheCases[k].trial.endDate).format('L');
            $scope.allTheCases[k].latestEndDateForCase = $scope.allTheCases[k].trial.endDate;
            $scope.allTheCases[k].trBeginX =
            moment($scope.allTheCases[k].trial.beginDate).diff(moment($scope.beginDate), 'days') * 2.5 + 10;
            $scope.allTheCases[k].trLength =
            moment($scope.allTheCases[k].trial.endDate).diff(moment($scope.allTheCases[k].trial.beginDate), 'days') * 2.5;
            $scope.allTheCases[k].lineEndDate = $scope.allTheCases[k].trial.beginDate;
            // console.log($scope.allTheCases[k].lineEndDate);
            $scope.allTheCases[k].trial.dateDisplay = $scope.allTheCases[k].trial.beginDate + " to " + $scope.allTheCases[k].trial.endDate;

            if(moment($scope.allTheCases[k].trial.beginDate) >= moment($scope.todaysDate)){
              $scope.allTheCases[k].trial.daysToGo = moment($scope.allTheCases[k].trial.beginDate).diff(moment($scope.todaysDate), 'days');
              if($scope.allTheCases[k].trial.daysToGo == 0){
                $scope.allTheCases[k].trial.daysToGoDisplay = "(Today)";
              };
              if($scope.allTheCases[k].trial.daysToGo == 1){
                $scope.allTheCases[k].trial.daysToGoDisplay = "(" + $scope.allTheCases[k].trial.daysToGo + " day away)";
              };
              if($scope.allTheCases[k].trial.daysToGo > 1){
                $scope.allTheCases[k].trial.daysToGoDisplay = "(" + $scope.allTheCases[k].trial.daysToGo + " days away)";
              };
            };

            if(moment($scope.allTheCases[k].trial.endDate) > moment($scope.latestEndDate)){
              $scope.latestEndDate = $scope.allTheCases[k].trial.endDate;
            }

          }

          for (var l = 0; l < $scope.allTheCases[k].events.length; l++){

            $scope.allTheCases[k].events[l].date = moment($scope.allTheCases[k].events[l].date).format('L');

            if(moment($scope.allTheCases[k].events[l].date) >= moment($scope.todaysDate)){
              $scope.allTheCases[k].events[l].daysToGo = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.todaysDate), 'days');
              if($scope.allTheCases[k].events[l].daysToGo == 0){
                $scope.allTheCases[k].events[l].daysToGoDisplay = "(Today)";
              };
              if($scope.allTheCases[k].events[l].daysToGo == 1){
                $scope.allTheCases[k].events[l].daysToGoDisplay = "(" + $scope.allTheCases[k].events[l].daysToGo + " day away)";
              };
              if($scope.allTheCases[k].events[l].daysToGo == 1){
                $scope.allTheCases[k].events[l].daysToGoDisplay = "(" + $scope.allTheCases[k].events[l].daysToGo + " day away)";
              };
              if($scope.allTheCases[k].events[l].daysToGo > 1){
                $scope.allTheCases[k].events[l].daysToGoDisplay = "(" + $scope.allTheCases[k].events[l].daysToGo + " days away)";
              };
              // $scope.allTheCases[k].events[l].daysToGo = "(" + moment($scope.allTheCases[k].events[l].date).diff(moment($scope.todaysDate), 'days') + " days away)";
            };

            $scope.allTheCases[k].events[l].positionX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days') * 2.5 + 10;

            if(moment($scope.allTheCases[k].events[l].date) > moment($scope.allTheCases[k].lineEndDate)){
              $scope.allTheCases[k].lineEndDate = $scope.allTheCases[k].events[l].date;
              $scope.allTheCases[k].latestEndDateForCase = $scope.allTheCases[k].lineEndDate;
              // console.log($scope.allTheCases[k].lineEndDate);
            }

            if(moment($scope.allTheCases[k].lineEndDate) > moment($scope.latestEndDate)){
              $scope.latestEndDate = $scope.allTheCases[k].lineEndDate;
            }
        }
        $scope.allTheCases[k].lastDateX =
        moment($scope.allTheCases[k].lineEndDate).diff(moment($scope.beginDate), 'days') * 2.5 + 10;
        // console.log($scope.allTheCases[k].lastDateX);

        $scope.displayWidthX =
        (moment($scope.latestEndDate).diff(moment($scope.beginDate), 'days') * 2.5) + 200;

        $scope.displayHeightY = ($scope.allTheCases.length * 115) + 100;

        $scope.allTheCases[k].latestDateX =
        moment($scope.allTheCases[k].latestEndDateForCase).diff(moment($scope.beginDate), 'days') * 2.5 + 10;

      }
    });
  };

  // $scope.putTheCase = function(caseToPut){
  //     console.log(caseToPut);
  //
  //     mainServ.changeTheCase(caseToPut)
  //       .then(function(response){
  //         $scope.getCases();
  //       });
  //   };

  $scope.deleteTheCase = function(caseToRemove){
    mainServ.destroyTheCase(caseToRemove)
      .then(function(response){
        $scope.getCases();
      });
  };

  $scope.getCases();

  $scope.showEventInfo = function(event){
    $scope.showMoreEventInfo = true;
    $scope.modalEvent = event;
    // console.log($scope.modalEvent);
  }

  $scope.showTrialInfo = function(event){
    $scope.showMoreTrialInfo = true;
    $scope.modalEvent = event;
    // console.log($scope.modalEvent);
  }

  $scope.showCaseInfo = function(event){
    $scope.showMoreCaseInfo = true;
    $scope.modalEvent = event;
  }

  $scope.showEditInfo = function(event){
    $scope.showMoreEditInfo = true;
    $scope.modalEvent = event;
  }

  $scope.showDeleteModal = function(event){
    $scope.showMoreDeleteInfo = true;
    $scope.modalEvent = event;
  }

});
