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
.directive("moreInfoEventModal", function(){
  return {
    templateUrl: "./templates/moreInfoEventModal.html",
    controller: "mainCtrl"
  }
})

.directive("moreInfoTrialModal", function(){
  return {
    templateUrl: "./templates/moreInfoTrialModal.html",
    controller: "mainCtrl"
  }
})

.directive("moreInfoCaseModal", function(){
  return {
    templateUrl: "./templates/moreInfoCaseModal.html",
    controller: "mainCtrl"
  }
})

.directive("editCaseModal", function(){
  return {
    templateUrl: "./templates/editCaseModal.html",
    controller: "mainCtrl"
  }
})

.directive("deleteCaseModal", function(){
  return {
    templateUrl: "./templates/deleteCaseModal.html",
    controller: "mainCtrl"
  }
})

.directive("dateLine", function(){
  return {
    templateUrl: "./templates/dateLine.html",
    controller: "mainCtrl"
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

    $(document).ready(function(){
      console.log("scrolling");
    $(window).scroll(function(){

      $('#footer').css('left', 0 - $(this).scrollLeft());
    });

      // $("#footer").on("mouseover", function(e){
      //   $("#movingLine")[0].style.display = "block";
      //   var pos = e.pageX;
      //
      //
      //   $("#movingLine")[0].setAttribute('x1', pos);
      //   $("#movingLine")[0].setAttribute('x2', pos);
      //   $("#footer").on("mouseout", function(e){
      //     $("#movingLine")[0].style.display = "none";
      //   });
      // })

    });
