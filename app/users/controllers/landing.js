'use strict';

// Registration controller used for communicating with the users REST endpoint
var app = angular.module('konux');
app.controller('LandingCtrl', function($scope, $location, Users, userLocator) {
  var user = userLocator.getUser();
  $scope.email = user.email;
  $scope.password = user.password;
  $scope.firstName = user.firstName;
  $scope.lastName = user.lastName;
});