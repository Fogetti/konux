'use strict';

// Registration controller used for communicating with the users REST endpoint
var app = angular.module('konux');
app.controller('RegisterCtrl', function($scope, $location, $rootScope, Users, userLocator) {
  $scope.create = function() {
    Users.save({
      "email" : $scope.email,
      "password" : $scope.password,
      "firstName" : $scope.firstName,
      "lastName" : $scope.lastName
    }).$promise.then(
      //success
      function( user ){
        console.log('Sending user: '+$scope.email);
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
        // TODO
      }
    );
  }
});
app.directive('passwordValidated', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function passwordValidation(value) {
        var pattern = /[a-zA-Z0-9\W]{7,}/;
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