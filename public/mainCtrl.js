angular.module("bigPicture")
.controller("mainCtrl", function($scope, mainServ){

$scope.newCase = mainServ.newCase();

$scope.postNewCase = function(nextCase){

  mainServ.addNewCase(nextCase)
    .then(function(response){
      document.getElementById('addNewModal').style.display = "none";
      $scope.newCase = mainServ.newCase();
      $scope.check1 = false;
      location.reload();
    });
};

$scope.getCases = function(){
    mainServ.getAllTheCases()
      .then(function(response){
        $scope.allTheCases = response;

        // Today's Date
        $scope.todaysDate = moment().format("YYYY-MM-DD");
        $scope.todaysDateDisplay = moment().format("MMM. DD 'YY");
        $scope.todaysDateX = moment.utc().diff(moment.utc($scope.beginDate), 'days');

        //Center today's date line on reload ************
        document.body.scrollLeft = ($scope.todaysDateX) - (window.outerWidth/2);

        //Earliest Date
        $scope.beginDate = $scope.allTheCases[0].schedConf;
        $scope.latestEndDate = $scope.todaysDate;
        for (var i = 0; i < $scope.allTheCases.length; i++) {
          $scope.allTheCases[i].schedConf = moment.utc($scope.allTheCases[i].schedConf).format("YYYY-MM-DD");
          if(moment.utc($scope.allTheCases[i].schedConf) < moment.utc($scope.beginDate)){
            $scope.beginDate = $scope.allTheCases[i].schedConf;
          }
        }

        for (var k = 0; k < $scope.allTheCases.length; k++) {

          //Scheduling Conference X-coordinate
          // $scope.allTheCases[k].schedConfX = moment.utc($scope.allTheCases[k].schedConf).diff(moment.utc($scope.beginDate),'days') * 2.5 + 100;

          $scope.allTheCases[k].schedConfX = moment.utc($scope.allTheCases[k].schedConf).diff(moment.utc($scope.beginDate),'days');
          console.log($scope.allTheCases[k].schedConfX);

          $scope.allTheCases[k].lineEndDate = $scope.allTheCases[k].schedConf;

          $scope.allTheCases[k].latestEndDateForCase = $scope.allTheCases[k].schedConf;

          //Establish trial-related dates and X-coordinates
          if($scope.allTheCases[k].trial.beginDate){

            //Trial begin date
            $scope.allTheCases[k].trial.beginDate = moment.utc($scope.allTheCases[k].trial.beginDate).format("YYYY-MM-DD");

            //Trial begin date for display
            $scope.allTheCases[k].trial.beginDateDisplay = moment.utc($scope.allTheCases[k].trial.beginDate).format("MMM. DD 'YY");

            //Trial end date
            $scope.allTheCases[k].trial.endDate = moment.utc($scope.allTheCases[k].trial.endDate).format("YYYY-MM-DD");

            //Trial end date for the display
            $scope.allTheCases[k].trial.endDateDisplay = moment.utc($scope.allTheCases[k].trial.endDate).format("MMM. DD 'YY");

            //Latest date for the individual case (if a trial)
            $scope.allTheCases[k].latestEndDateForCase = $scope.allTheCases[k].trial.endDate;

            //Beginning X-coordinate for the individual case
            $scope.allTheCases[k].trBeginX =
            moment.utc($scope.allTheCases[k].trial.beginDate).diff(moment.utc($scope.beginDate), 'days');

            //Total individual trial length (in pixels)
            $scope.allTheCases[k].trLength =
            moment.utc($scope.allTheCases[k].trial.endDate).diff(moment.utc($scope.allTheCases[k].trial.beginDate), 'days');


            $scope.allTheCases[k].lineEndDate = $scope.allTheCases[k].trial.beginDate;

            //Trial dates for display
            $scope.allTheCases[k].trial.dateDisplay = $scope.allTheCases[k].trial.beginDateDisplay + " to " + $scope.allTheCases[k].trial.endDateDisplay;

            //Days to go calculation for trial
            if(moment.utc($scope.allTheCases[k].trial.beginDate) >= moment.utc($scope.todaysDate)){
              $scope.allTheCases[k].trial.daysToGo = moment.utc($scope.allTheCases[k].trial.beginDate).diff(moment.utc($scope.todaysDate), 'days');

              if($scope.allTheCases[k].trial.daysToGo == 0){
                $scope.allTheCases[k].trial.daysToGoDisplay = "(Today)";
              };

              if($scope.allTheCases[k].trial.daysToGo == 1){
                $scope.allTheCases[k].trial.daysToGoDisplay = "(Tomorrow)";
              };

              if($scope.allTheCases[k].trial.daysToGo > 1){
                $scope.allTheCases[k].trial.daysToGoDisplay = "(" + $scope.allTheCases[k].trial.daysToGo + " days away)";
              };
            };

            //Adjusts latest date if last trial end date is beyond it
            if(moment.utc($scope.allTheCases[k].trial.endDate) > moment.utc($scope.latestEndDate)){
              $scope.latestEndDate = $scope.allTheCases[k].trial.endDate;
            }

          }

          //Loop through events to form dates and X-coordinates
          for (var l = 0; l < $scope.allTheCases[k].events.length; l++){

            //Formats date and sets X-coordinate if an event date exists
            if($scope.allTheCases[k].events[l].date){
              $scope.allTheCases[k].events[l].date = moment.utc($scope.allTheCases[k].events[l].date).format("YYYY-MM-DD");
              $scope.allTheCases[k].events[l].dateDisplay = moment.utc($scope.allTheCases[k].events[l].date).format("MMM. DD 'YY");
              $scope.allTheCases[k].events[l].positionX = moment.utc($scope.allTheCases[k].events[l].date).diff(moment.utc($scope.beginDate),'days');

              //Calculates days until events that are beyond today
              if(moment.utc($scope.allTheCases[k].events[l].date) >= moment.utc($scope.todaysDate)){
                $scope.allTheCases[k].events[l].daysToGo = moment.utc($scope.allTheCases[k].events[l].date).diff(moment.utc($scope.todaysDate), 'days')

                if($scope.allTheCases[k].events[l].daysToGo == 0){
                  $scope.allTheCases[k].events[l].daysToGoDisplay = "(Today)";
                }
                if($scope.allTheCases[k].events[l].daysToGo == 1){
                  $scope.allTheCases[k].events[l].daysToGoDisplay = "(Tomorrow)";
                }
                if($scope.allTheCases[k].events[l].daysToGo > 1){
                  $scope.allTheCases[k].events[l].daysToGoDisplay = "(" + $scope.allTheCases[k].events[l].daysToGo + " days away)";
                }
              }

              //Sets latest case end date if event date is beyond latest date
              if(moment.utc($scope.allTheCases[k].events[l].date) > moment.utc($scope.allTheCases[k].lineEndDate)){
                $scope.allTheCases[k].lineEndDate = $scope.allTheCases[k].events[l].date;
                $scope.allTheCases[k].latestEndDateForCase = $scope.allTheCases[k].lineEndDate;
              }
            }
          }

        //Sets latest overall date if it is beyond that already set
        if(moment.utc($scope.allTheCases[k].lineEndDate) > moment.utc($scope.latestEndDate)){
          $scope.latestEndDate = $scope.allTheCases[k].lineEndDate;
        }

        //Sets latest overall X-coordinate
        $scope.allTheCases[k].lastDateX =
        moment.utc($scope.allTheCases[k].lineEndDate).diff(moment.utc($scope.beginDate), 'days');

        //Sets display width
        $scope.displayWidthX =
        moment.utc($scope.latestEndDate).diff(moment.utc($scope.beginDate), 'days');

        //Sets display height
        $scope.displayHeightY = $scope.allTheCases.length;

        $scope.allTheCases[k].latestDateX =
        moment.utc($scope.allTheCases[k].latestEndDateForCase).diff(moment.utc($scope.beginDate), 'days');

        $scope.lastXCoord = moment.utc($scope.latestEndDate).diff(moment.utc($scope.beginDate), 'days');

      }
      $scope.monthsDateLine = Math.floor(moment.utc($scope.latestEndDate).diff(moment.utc($scope.beginDate), 'months'));

      // $scope.monthsDateLine = moment(.startOf('month').isBetween);
      // console.log($scope.monthsDateLine);

      $scope.dateLineInfo = [];
      for(var i = 0; i < $scope.monthsDateLine; i++){
        $scope.dateLineInfo.push({month: (moment.utc($scope.beginDate).add(i+1, 'months').startOf('month').format("MMM 'YY")), xPos: (moment.utc($scope.beginDate).add(i+1, 'months').startOf('month').diff(moment.utc($scope.beginDate), 'days'))});
      }
    });
  };

  $scope.putTheCase = function(caseToPut){
      mainServ.changeTheCase(caseToPut)
        .then(function(response){
          // $scope.getCases();
          location.reload();
        });
    };

  $scope.deleteTheCase = function(caseToRemove){
    mainServ.destroyTheCase(caseToRemove)
      .then(function(response){
        // $scope.getCases();
        location.reload();
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

  $scope.showTrialCalendar = function(){
    $scope.showMoreTrialCalendar = true;
  }

});
