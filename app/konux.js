'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('konux', ['ngRoute','ngResource', 'konux.config']);

app.config(function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode({
    enabled: false,
    requireBase: true
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
});

app.service('userLocator', function() {
  var user;
  var addUser = function( _user_ ) { user = _user_; };
  var getUser = function(){ return user; };
  return {
    addUser: addUser,
    getUser: getUser
  };

});

app.controller('KonuxCtrl', function($scope, $timeout, $location, Users, userLocator) {
  $scope.login = function ( event ) {
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
        $('#inputEmail').tooltip('show');
        $('#inputFields').addClass('has-error');
      }
    );
  };

  $scope.go = function ( path ) {
    $location.path( path );
  };
});
