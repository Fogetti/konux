describe("Users Factory", function() {

    var User;
    var $httpBackend;
    var $rootScope;

    beforeEach(function() {
        module('konux');
        inject(function(Users) {
            User = Users;
        });
    });

    beforeEach(inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $rootScope = $injector.get('$rootScope');
    }));

    it("must be defined", function() {
        expect(User).toBeDefined();
    });

    it("HTTP must fail when URL is incorrect", function() {
      // TODO: find out how to test the resource with wrong URL
    });

    it("query users fails", function(done) {
        $httpBackend.expect('GET', '/user').respond(500, 'Failure');
        var users = User.query(function() {},function() { done(); });
        $httpBackend.flush();
    });

    it("query must return empty array when no users found", function() {
        $httpBackend.expect('GET', '/user').respond(200, []);
        var users = User.query(function() { expect(users.length).toEqual(0); });
        $httpBackend.flush();
    });

    it("query must return single element array when single user found", function() {
        $httpBackend.expect('GET', '/user').respond(200, [{name: 'Gergely'}]);
        var users = User.query(function() {
          expect(users.length).toEqual(1);
          expect(users[0].name).toEqual('Gergely');
        });
        $httpBackend.flush();
    });

    it("query must return multiple elements when multiple users found", function() {
        $httpBackend.expect('GET', '/user').respond(200, [{name: 'Gergely'},{name: 'John'}]);
        var users = User.query(function() {
          expect(users.length).toEqual(2);
          expect(users[0].name).toEqual('Gergely');
          expect(users[1].name).toEqual('John');
        });
        $httpBackend.flush();
    });

    it("get user successful", function() {
        $httpBackend.expect('GET', '/user/123').respond(200, {name: 'Gergely'});
        User.get({userId:123},function(user){
          expect(user.name).toEqual('Gergely');
        },function(){});
        $httpBackend.flush();
    });

    it("get user fails", function(done) {
        $httpBackend.expect('GET', '/user/123').respond(500, 'Failure');
        User.get({userId:123},function(){},function(){
          done();
        });
        $httpBackend.flush();
    });

    it("save user successful", function(done) {
        $httpBackend.expect('GET', '/user/123').respond(200, {name: 'Gergely'});
        $httpBackend.expect('POST', '/user').respond(200, {name: 'Gergely'});
        User.get({userId:123},function(user){
          user.$save(function(){
            done();
          },function(){});
        },function(){});
        $httpBackend.flush();
    });

    it("save user fails", function(done) {
        $httpBackend.expect('GET', '/user/123').respond(200, {name: 'Gergely'});
        $httpBackend.expect('POST', '/user').respond(500, 'Failure');
        User.get({userId:123},function(user){
          user.$save(function(){},function(){
            done();            
          });
        },function(){});
        $httpBackend.flush();
        
    });

    it("remove user successful", function(done) {
        $httpBackend.expect('GET', '/user/123').respond(200, {name: 'Gergely'});
        $httpBackend.expect('DELETE', '/user/123').respond(200, 'Success');
        User.get({userId:123},function(user){
          user.$remove({userId:123},function(){
            done();
          },function(){});
        },function(){});
        $httpBackend.flush();
    });

    it("remove user fails", function(done) {
        $httpBackend.expect('GET', '/user/123').respond(200, {name: 'Gergely'});
        $httpBackend.expect('DELETE', '/user/123').respond(500, 'Failure');
        User.get({userId:123},function(user){
          user.$remove({userId:123},function(){},function(){
            done();
          });
        },function(){});
        $httpBackend.flush();
    });

    it("update user successful", function(done) {
        var updated;
        $httpBackend.expect('GET', '/user/123').respond(200, {name: 'Gergely'});
        $httpBackend.expect('PUT', '/user/123', updated).respond(200, 'Success');
        User.get({userId:123},function(user){
          updated = user;
          User.update({userId:123},user).$promise.then(
            //success
            function( value ){ done(); },
            //error
            function( error ){ }
          );
        },function(){});
        $httpBackend.flush();
    });

    it("update user fails", function(done) {
        var updated;
        $httpBackend.expect('GET', '/user/123').respond(200, {name: 'Gergely'});
        $httpBackend.expect('PUT', '/user/123', updated).respond(500, 'Failure');
        User.get({userId:123},function(user){
          updated = user;
          User.update({userId:123},user).$promise.then(
            //success
            function( value ){ },
            //error
            function( error ){ done(); }
          );
        },function(){});
        $httpBackend.flush();
    });

});