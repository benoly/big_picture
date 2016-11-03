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

        $scope.todaysDateX = moment().diff(moment($scope.beginDate), 'days');

        document.body.scrollLeft = ($scope.todaysDateX * 3) - (window.outerWidth/2);

        for (var k = 0; k < $scope.allTheCases.length; k++) {

          $scope.allTheCases[k].schedConfX = moment($scope.allTheCases[k].schedConf).diff(moment($scope.beginDate),'days');

          $scope.allTheCases[k].lineEndDate = $scope.allTheCases[k].schedConf;

          if($scope.allTheCases[k].trial){
            $scope.allTheCases[k].trBeginX =
            moment($scope.allTheCases[k].trial.beginDate).diff(moment($scope.beginDate), 'days');
            $scope.allTheCases[k].trLength =
            moment($scope.allTheCases[k].trial.endDate).diff(moment($scope.allTheCases[k].trial.beginDate), 'days');
            $scope.allTheCases[k].lineEndDate = $scope.allTheCases[k].trial.beginDate;
            $scope.allTheCases[k].trial.dateDisplay = moment($scope.allTheCases[k].trial.beginDate).format('L') + " to " + moment($scope.allTheCases[k].trial.endDate).format('L');

            if(moment($scope.allTheCases[k].trial.beginDate) > moment($scope.todaysDate)){
              $scope.allTheCases[k].trial.daysToGo = "(" + moment($scope.allTheCases[k].trial.beginDate).diff(moment($scope.todaysDate), 'days') + " days away)";
            };

          }

          for (var l = 0; l < $scope.allTheCases[k].events.length; l++){

            $scope.allTheCases[k].events[l].date = moment($scope.allTheCases[k].events[l].date).format('L');

            if(moment($scope.allTheCases[k].events[l].date) > moment($scope.todaysDate)){
              $scope.allTheCases[k].events[l].daysToGo = "(" + moment($scope.allTheCases[k].events[l].date).diff(moment($scope.todaysDate), 'days') + " days away)";
            };

            $scope.allTheCases[k].events[l].positionX = moment($scope.allTheCases[k].events[l].date).diff(moment($scope.beginDate),'days');
            if(moment($scope.allTheCases[k].events[l].date) > moment($scope.allTheCases[k].lineEndDate)){
              $scope.allTheCases[k].lineEndDate = $scope.allTheCases[k].events[l].date;
            }

            $scope.allTheCases[k].lastDateX =
            moment($scope.allTheCases[k].lineEndDate).diff(moment($scope.beginDate), 'days');

        }
      }
    });
  };

  $scope.getCases();
});
