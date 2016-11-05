angular.module("bigPicture", ["ui.router"])

.directive("addNew", function(){
  return {
    templateUrl:"./templates/addNewModal.html",

    controller: function($scope){

      //addNew modal//
      var modal = document.getElementById('addNewModal');
      var btn = document.getElementById("addNew");
      var span = document.getElementsByClassName("close")[0];
      btn.onclick = function() {
          modal.style.display = "block";
      }
      span.onclick = function() {
          modal.style.display = "none";
      }
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }


    }
  }
})

.config(function($urlRouterProvider, $stateProvider){
  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "./templates/home.html",
      controller: "mainCtrl" //may fix loading problem if removed
    })
    .state("detail", {
      url: "/detail",
      templateUrl: "./templates/detail.html",
      controller: "mainCtrl" //may fix loading problem if removed
    })

    $urlRouterProvider.otherwise("/");

  })
