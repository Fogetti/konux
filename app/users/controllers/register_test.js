describe('directives', function() {

  var $scope, form;
  
  beforeEach(module('konux'));
  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    var element = angular.element(
      '<form name="form">' +
      '<input type="password" ng-model="password" name="password" required password-validated />' +
      '<input type="name" ng-model="name" name="name" required name-validated />' +
      '</form>'
    );
    $scope.password = null;
    $scope.name = null;
    $compile(element)($scope);
    $scope.$digest();
    form = $scope.form;
  }));

  describe('password validator', function() {
    it('passes when all condition was met', function() {
      form.password.$setViewValue('What3!wonder');
      expect($scope.password).toEqual('What3!wonder');
      expect(form.password.$valid).toBe(true);
    });
    it('fails when string is shorter than 7 character', function() {
      form.password.$setViewValue('What3!');
      expect($scope.password).toEqual('What3!');
      expect(form.password.$valid).toBe(false);
    });
    it('fails when string has no lower case letter', function() {
      form.password.$setViewValue('AAAAA2!');
      expect($scope.password).toEqual('AAAAA2!');
      expect(form.password.$valid).toBe(false);
    });
    it('fails when string has no upper case letter', function() {
      form.password.$setViewValue('aaaaa2!');
      expect($scope.password).toEqual('aaaaa2!');
      expect(form.password.$valid).toBe(false);
    });
    it('fails when string has no digit', function() {
      form.password.$setViewValue('aaaaaA!');
      expect($scope.password).toEqual('aaaaaA!');
      expect(form.password.$valid).toBe(false);
    });
  });

  describe('name validator', function() {
    it('passes when string is at least 3 characters long', function() {
      form.name.$setViewValue('What3!wonder');
      expect($scope.name).toEqual('What3!wonder');
      expect(form.name.$valid).toBe(true);
    });
    it('fails when string is shorter than 3 characters long', function() {
      form.name.$setViewValue('Wh');
      expect($scope.name).toEqual('Wh');
      expect(form.name.$valid).toBe(false);
    });
  });

  describe('register controller', function() {
    var User;
    var $httpBackend;
    var $rootScope;
    var $controller;

    beforeEach(inject(function(_$controller_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $controller = _$controller_;
    }));

    beforeEach(inject(function(Users) {
      User = Users;
    }));

    beforeEach(inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $rootScope = $injector.get('$rootScope');
    }));

    it('fails when the API call fails', function(done) {
      $httpBackend.expect('POST', '/user').respond(function(method, url, data, headers, params) {
        done();
        return [500, 'Failure'];
      })
      var controller = $controller('RegisterCtrl', { $scope: $scope, Users: User });
      $scope.create();
      $httpBackend.flush();
    });

    it('succeeds when the API call succeeds', function(done) {
      $httpBackend.expect('POST', '/user').respond(function(method, url, data, headers, params) {
        done();
        return [200, 'Success'];
      })
      var controller = $controller('RegisterCtrl', { $scope: $scope, Users: User });
      $scope.create();
      $httpBackend.flush();
    });
  });
});