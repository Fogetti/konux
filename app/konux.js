'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('konux', ['ngRoute','ngResource', 'konux.config']);
app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $routeProvider.when('/landing', {
      templateUrl: 'users/views/landing.html'
  });
  $routeProvider.when('/register', {
      templateUrl: 'users/views/register.html'
  });
  $routeProvider.when('/login', {
      templateUrl: 'users/views/login.html'
  });
  $routeProvider.when('/', {
      templateUrl: 'users/views/login.html'
  });
}]);
app.service('userLocator', function() {
  var user;

  var addUser = function(_user) {
      user = _user;
  };

  var getUser = function(){
      return user;
  };

  return {
    addUser: addUser,
    getUser: getUser
  };

});
app.controller('KonuxCtrl', function($scope, $location, Users, userLocator) {
  $scope.login = function ( ) {
    Users.get(
      { userId : $scope.email+'+'+$scope.password },
      function( user ){
        userLocator.addUser({
          "email" : user.email,
          "password" : user.password,
          "firstName" : user.firstName,
          "lastName" : user.lastName
        });
        $location.path( 'landing' );
      },
      function( error ){
        // TODO: show error message
      }
    );
  };

  $scope.go = function ( path ) {
    $location.path( path );
  };
});