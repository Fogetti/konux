'use strict';

// Landing controller used for displaying the landing page
var app = angular.module('konux');
app.controller('LandingCtrl', function($scope, $timeout, $location, Users, userLocator) {
  $scope.alertSuccess = true;

  var user = userLocator.getUser();
  $scope.email = user.email;
  $scope.password = user.password;
  $scope.firstName = user.firstName;
  $scope.lastName = user.lastName;
  
  $scope.alert = function() {
    $timeout(function() {
      $scope.alertSuccess = false;
    }, 2000);
  };
});