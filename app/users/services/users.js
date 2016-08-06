'use strict';

// Users service used for communicating with the users REST endpoint
angular
.module('konux')
.factory('Users', ['$resource', 'ENV', function($resource, ENV) {
  return $resource(ENV.api, {userId:'@id'}, {
    update: {
      method: 'PUT'
    }
  });
}]);