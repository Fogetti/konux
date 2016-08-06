'use strict';

// Registration controller used for communicating with the users REST endpoint
var app = angular.module('konux');
app.controller('RegisterCtrl', function($scope, $location, $timeout, $rootScope, Users, userLocator) {
  $scope.alertFailure = false;
  $scope.alertTitle = '';

  $scope.alert = function() {
    $timeout(function() {
      $scope.alertFailure = false;
    }, 5000);
  };

  $scope.create = function() {
    Users.save({
      "email" : $scope.email,
      "password" : $scope.password,
      "firstName" : $scope.firstName,
      "lastName" : $scope.lastName
    }).$promise.then(
      //success
      function( user ){
        userLocator.addUser({
          "email" : $scope.email,
          "password" : $scope.password,
          "firstName" : $scope.firstName,
          "lastName" : $scope.lastName
        });
        $location.path( 'landing' );
      },
      //error
      function( error ){
        $scope.alertFailure = true;
        $scope.alertTitle = 'Server error: "'+error.data.error+'". Please try again later.';
        $scope.alert();
      }
    );
  }
});
app.directive('passwordValidated', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function passwordValidation(value) {
        var pattern = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,}/;
        if (pattern.test(value)) {
          mCtrl.$setValidity('passwordValidated', true);
        } else {
          mCtrl.$setValidity('passwordValidated', false);
        }
        return value;
      }
      mCtrl.$parsers.push(passwordValidation);
    }
  };
});
app.directive('nameValidated', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function nameValidation(value) {
        var pattern = /.{3,}/;
        if (pattern.test(value)) {
          mCtrl.$setValidity('nameValidated', true);
        } else {
          mCtrl.$setValidity('nameValidated', false);
        }
        return value;
      }
      mCtrl.$parsers.push(nameValidation);
    }
  };
});