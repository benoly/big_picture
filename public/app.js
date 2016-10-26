angular.module("bigPicture", ["ui.router"])

.config(function($urlRouterProvider, $stateProvider){
  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "./templates/home.html",
      controller: "mainCtrl"
    })
    .state("detail", {
      url: "/detail",
      templateUrl: "./templates/detail.html",
      controller: "mainCtrl"
    })

    $urlRouterProvider.otherwise("/");

  })
