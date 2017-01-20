(function(){
  'use strict';
  angular.module('apApp.adminModules.services')
    .service('AdminServices', ['$http', 'API_URL', function($http, API_URL) {

      return {
        // CRUD Operations for Role

        // Save Role Entity
        saveRoleEntity : function(dataObject, successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL.roles + 'v1/roles/',
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
        },


        // Update Role Entity
        updateRoleEntity : function(dataObject, roleId, successCallback, errorCallback) {
          var url = API_URL.roles + 'v1/roles/' + roleId,
              data = dataObject,
              headers = {
                'Content-Type' : 'application/json'
              };
          $http.put(url, data, headers)
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        // Delete Role Entity
        deleteRoleEntity : function(roleId, successCallback, errorCallback) {
          var url = API_URL.roles + 'v1/roles/' + roleId;
          $http.delete(url)
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        // Get All Roles
        getRoles : function(successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL.roles + 'v1/roles',
            headers: {
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        // CRUD Operations for Organization Levels
        getOrganizationLevels : function(successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL.orgnizationLevel + 'v1/orglevels',
            headers: {
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        // CRUD Operations for Users
        saveUser : function(dataObject, successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL.users + 'v1/users/',
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
        },

        getIndividualUser : function(id, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL.users + 'v1/users/'+ id,
            headers: {
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        getAllUsers : function(pageSize, pageNumber, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL.users + 'v1/users?pageSize=' + pageSize + "&pageNumber=" + pageNumber,
            headers: {
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        getAllFilteredUsers : function(pageSize, pageNumber, searchStr, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL.users + 'v1/users?pageSize=' + pageSize + "&pageNumber=" + pageNumber + "&" + searchStr,
            headers: {
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        // Update User
        updateUser : function(dataObject, userId, successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL.users + 'v1/users/' + userId,
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
        },

        // Delete Role Entity
        deleteUser : function(userId, successCallback, errorCallback) {
          var url = API_URL.users + 'v1/users/' + userId;

          $http.delete(url)
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
      };
    }]);
})();
