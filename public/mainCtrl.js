angular.module("bigPicture")
.controller("mainCtrl", function($scope, mainServ){

$scope.newCase = mainServ.newCase();

$scope.postNewCase = function(nextCase){

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
        // console.log(response);

        $scope.todaysDate = moment.utc().format('L');

        $scope.beginDate = $scope.allTheCases[0].schedConf;

        // console.log(moment.utc("11/12/2016").format("YYYY-MM-DD"));

        for (var j = 0; j < $scope.allTheCases.length; j++) {
          $scope.allTheCases[j].schedConf = moment.utc($scope.allTheCases[j].schedConf).format("YYYY-MM-DD");
          // console.log($scope.allTheCases[j].schedConf);
          if(moment.utc($scope.allTheCases[j].schedConf) < moment.utc($scope.beginDate)){
            $scope.beginDate = $scope.allTheCases[j].schedConf;
          }
        }

        $scope.todaysDateX = (moment.utc().diff(moment.utc($scope.beginDate), 'days')) * 2.5 + 100;

        $scope.latestEndDate = $scope.todaysDate;

        document.body.scrollLeft = ($scope.todaysDateX) - (window.outerWidth/2);

        for (var k = 0; k < $scope.allTheCases.length; k++) {

          $scope.allTheCases[k].schedConfX = moment.utc($scope.allTheCases[k].schedConf).diff(moment.utc($scope.beginDate),'days') * 2.5 + 100;

          $scope.allTheCases[k].lineEndDate = $scope.allTheCases[k].schedConf;

          $scope.allTheCases[k].latestEndDateForCase = $scope.allTheCases[k].schedConf;

          if($scope.allTheCases[k].trial.beginDate){
            $scope.allTheCases[k].trial.beginDate = moment.utc($scope.allTheCases[k].trial.beginDate).format('L');
            $scope.allTheCases[k].trial.endDate = moment.utc($scope.allTheCases[k].trial.endDate).format('L');
            console.log($scope.allTheCases[k].trial.endDate);
            $scope.allTheCases[k].latestEndDateForCase = $scope.allTheCases[k].trial.endDate;
            $scope.allTheCases[k].trBeginX =
            moment.utc($scope.allTheCases[k].trial.beginDate).diff(moment.utc($scope.beginDate), 'days') * 2.5 + 100;
            $scope.allTheCases[k].trLength =
            moment.utc($scope.allTheCases[k].trial.endDate).diff(moment.utc($scope.allTheCases[k].trial.beginDate), 'days') * 2.5;
            $scope.allTheCases[k].lineEndDate = $scope.allTheCases[k].trial.beginDate;
            // console.log($scope.allTheCases[k].lineEndDate);
            $scope.allTheCases[k].trial.dateDisplay = $scope.allTheCases[k].trial.beginDate + " to " + $scope.allTheCases[k].trial.endDate;

            if(moment.utc($scope.allTheCases[k].trial.beginDate) >= moment.utc($scope.todaysDate)){
              $scope.allTheCases[k].trial.daysToGo = moment.utc($scope.allTheCases[k].trial.beginDate).diff(moment.utc($scope.todaysDate), 'days');
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

            if(moment.utc($scope.allTheCases[k].trial.endDate) > moment.utc($scope.latestEndDate)){
              $scope.latestEndDate = $scope.allTheCases[k].trial.endDate;
            }

          }

          for (var l = 0; l < $scope.allTheCases[k].events.length; l++){

            if($scope.allTheCases[k].events[l].date){
              $scope.allTheCases[k].events[l].date = moment.utc($scope.allTheCases[k].events[l].date).format('L');
              $scope.allTheCases[k].events[l].positionX = moment.utc($scope.allTheCases[k].events[l].date).diff(moment.utc($scope.beginDate),'days') * 2.5 + 100;

              if(moment.utc($scope.allTheCases[k].events[l].date) >= moment.utc($scope.todaysDate)){
                $scope.allTheCases[k].events[l].daysToGo = moment.utc($scope.allTheCases[k].events[l].date).diff(moment.utc($scope.todaysDate), 'days')

                if($scope.allTheCases[k].events[l].daysToGo == 0){
                  $scope.allTheCases[k].events[l].daysToGoDisplay = "(Today)";
                }
                if($scope.allTheCases[k].events[l].daysToGo == 1){
                  $scope.allTheCases[k].events[l].daysToGoDisplay = "(" + $scope.allTheCases[k].events[l].daysToGo + " day away)";
                }
                if($scope.allTheCases[k].events[l].daysToGo == 1){
                  $scope.allTheCases[k].events[l].daysToGoDisplay = "(" + $scope.allTheCases[k].events[l].daysToGo + " day away)";
                }
                if($scope.allTheCases[k].events[l].daysToGo > 1){
                  $scope.allTheCases[k].events[l].daysToGoDisplay = "(" + $scope.allTheCases[k].events[l].daysToGo + " days away)";
                }
              }

              if(moment.utc($scope.allTheCases[k].events[l].date) > moment.utc($scope.allTheCases[k].lineEndDate)){
                $scope.allTheCases[k].lineEndDate = $scope.allTheCases[k].events[l].date;
                $scope.allTheCases[k].latestEndDateForCase = $scope.allTheCases[k].lineEndDate;
              }
            }
          }

        if(moment.utc($scope.allTheCases[k].lineEndDate) > moment.utc($scope.latestEndDate)){
          $scope.latestEndDate = $scope.allTheCases[k].lineEndDate;
        }

        $scope.allTheCases[k].lastDateX =
        moment.utc($scope.allTheCases[k].lineEndDate).diff(moment.utc($scope.beginDate), 'days') * 2.5 + 100;

        $scope.displayWidthX =
        (moment.utc($scope.latestEndDate).diff(moment.utc($scope.beginDate), 'days') * 2.5) + 300;

        $scope.displayHeightY = ($scope.allTheCases.length * 125) + 100;

        $scope.allTheCases[k].latestDateX =
        moment.utc($scope.allTheCases[k].latestEndDateForCase).diff(moment.utc($scope.beginDate), 'days') * 2.5 + 100;

        $scope.lastXCoord = moment.utc($scope.latestEndDate).diff(moment.utc($scope.beginDate), 'days') * 2.5 + 100;

      }
      $scope.monthsDateLine = Math.floor(moment.utc($scope.latestEndDate).diff(moment.utc($scope.beginDate), 'months'));

      $scope.dateLineInfo = [];
      for(var i = 0; i < $scope.monthsDateLine; i++){
        $scope.dateLineInfo.push({month: (moment.utc($scope.beginDate).add(i+1, 'months').startOf('month').format("MMM 'YY")), xPos: (moment.utc($scope.beginDate).add(i+1, 'months').startOf('month').diff(moment.utc($scope.beginDate), 'days') * 2.5 + 100)});
      }

    });
  };

  $scope.putTheCase = function(caseToPut){
      // console.log(caseToPut);
      mainServ.changeTheCase(caseToPut)
        .then(function(response){
          $scope.getCases();
        });
    };

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
