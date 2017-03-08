(function(){
  'use strict';
  angular.module('apApp.adminModules.services')
    .service('AdminServices', ['$http', 'AWS_URL', 'AWS', 'STATE', 'ENVIRONMENT', '$rootScope',
      function($http, AWS_URL, AWS, STATE, ENVIRONMENT, $rootScope) {

      return {
        // CRUD Operations for Role

        // Save Role Entity
        saveRoleEntity : function(dataObject, successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'POST',
            url: AWS  + STATE.role + ENVIRONMENT,
            // url: API_URL.roles + 'v1/roles/',
            data: JSON.stringify(dataObject),
            headers: {
              // 'authToken': AuthService.getToken(),
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.roleXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },


        // Update Role Entity
        updateRoleEntity : function(dataObject, roleId, successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'PUT',
            url: AWS  + STATE.role + ENVIRONMENT + roleId,
            data : dataObject,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.roleXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },

        // Delete Role Entity
        deleteRoleEntity : function(roleId, successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'DELETE',
            url: AWS  + STATE.role + ENVIRONMENT + roleId,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.roleXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },

        // Get All Roles
        getRoles : function(successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'GET',
            url: AWS  + STATE.role + ENVIRONMENT + '?tenantId=tenant1',
            // url: API_URL.roles + 'v1/roles',
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.roleXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },

        // CRUD Operations for Organization Levels
        getOrganisationLevels : function(successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'GET',
            url: AWS  + STATE.orgLevel + ENVIRONMENT + '?tenantId=tenant1',
            // url: API_URL.organisationLevel + 'v1/orglevels',
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.orgLevelXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },

        // CRUD Operations for Users
        saveUser : function(dataObject, successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'POST',
            url: AWS  + STATE.user + ENVIRONMENT,
            // url: API_URL.users + 'v1/users/',
            data: JSON.stringify(dataObject),
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.userXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },

        getIndividualUser : function(id, successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'GET',
            url: AWS  + STATE.user + ENVIRONMENT + id,
            // url: API_URL.users + 'v1/users/'+ id,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.userXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },

        getAllUsers : function(pageSize, pageNumber, successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'GET',
            url: AWS  + STATE.user + ENVIRONMENT + '?pageSize=' + pageSize + "&pageNumber=" + pageNumber,
            // url: API_URL.users + 'v1/users?pageSize=' + pageSize + "&pageNumber=" + pageNumber,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.userXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },

        getAllFilteredUsers : function(pageSize, pageNumber, searchStr, successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'GET',
            url: AWS  + STATE.user + ENVIRONMENT + '?pageSize=' + pageSize + "&pageNumber=" + pageNumber + "&" + searchStr,
            // url: API_URL.users + 'v1/users?pageSize=' + pageSize + "&pageNumber=" + pageNumber + "&" + searchStr,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.userXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },

        // Update User
        updateUser : function(dataObject, userId, successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'PUT',
            url: AWS  + STATE.user + ENVIRONMENT + userId,
            // url: API_URL.users + 'v1/users/' + userId,
            data: JSON.stringify(dataObject),
            headers: {
              // 'authToken': AuthService.getToken(),
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.userXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },

        // Delete Role Entity
        deleteUser : function(userId, successCallback, errorCallback) {
          $rootScope.loading = true;
          // var url = API_URL.users + 'v1/users/' + userId;
          $http({
            method: 'DELETE',
            url: AWS  + STATE.user + ENVIRONMENT + userId,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.userXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },

        // Locations APIs
        // Get All Locations
        getAllLocations : function(pageSize, pageNumber, successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'GET',
            url: AWS  + STATE.location + ENVIRONMENT,
            // url: AWS_URL.locations + 'locations?pageSize=' + pageSize + "&pageNumber=" + pageNumber,
            // url: API_URL.locations + 'v1/locations?pageSize=' + pageSize + "&pageNumber=" + pageNumber,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.locationXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },

        // getAllLocations : function(pageSize, pageNumber, successCallback, errorCallback) {
        getAllParentLocations : function(successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'GET',
            url: AWS  + STATE.location + ENVIRONMENT,
            // url: AWS_URL.locations + 'locations?pageSize=' + pageSize + "&pageNumber=" + pageNumber,
            // url: API_URL.locations + 'v1/locations?pageSize=' + pageSize + "&pageNumber=" + pageNumber,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.locationXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },

        // Get Filtered Location
        getAllFilteredLocations : function(pageSize, pageNumber, searchStr, successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'GET',
            url: AWS  + STATE.location + ENVIRONMENT + '?pageSize=' + pageSize + "&pageNumber=" + pageNumber + "&" + searchStr,
            // url: API_URL.locations + 'v1/locations?pageSize=' + pageSize + "&pageNumber=" + pageNumber + "&" + searchStr,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.locationXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },

        // Get Specific Location
        getSpecificLocation : function(id, successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'GET',
            url: AWS  + STATE.location + ENVIRONMENT + id,
            // url: API_URL.users + 'v1/users/'+ id,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.locationXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },
        // Save Location
        saveLocation : function(dataObject, successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'POST',
            url: AWS  + STATE.location + ENVIRONMENT,
            data: JSON.stringify(dataObject),
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.locationXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },

         // Update Role Entity
        updateLocation : function(dataObject, locationId, successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'PUT',
            url: AWS  + STATE.location + ENVIRONMENT + locationId,
            data : dataObject,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.locationXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },

        deleteLocation : function(locationId, successCallback, errorCallback) {
          $rootScope.loading = true;
          // var url = API_URL.users + 'v1/users/' + locationId;
          $http({
            method: 'DELETE',
            url: AWS  + STATE.location + ENVIRONMENT + locationId,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : AWS_URL.locationXKey
            }
          })
          .then(function onSuccess(response) {
            $rootScope.loading = false;
            successCallback(response);
          },
          function onError(response) {
            $rootScope.loading = false;
            errorCallback(response);
          });
        },
      };
    }]);
})();
