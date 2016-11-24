(function(){
  'use strict';
  angular.module('apApp.adminModules.services')
    .service('AdminServices', ['$http', 'API_URL', function($http, API_URL) {
      return {
        // Registering Employer
        saveRoleDetails : function(dataObject, successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL + 'v1/role',
            data: JSON.stringify(dataObject),
            headers: {
              // 'authToken': AuthService.getToken(),
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        }
      };
    }]);
})();
