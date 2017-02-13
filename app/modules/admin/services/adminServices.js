(function(){
  'use strict';
  angular.module('apApp.adminModules.services')
    .service('AdminServices', ['$http', 'API_URL', 'AWS_URL', '$rootScope',
      function($http, API_URL, AWS_URL, $rootScope) {

      return {
        // CRUD Operations for Role

        // Save Role Entity
        saveRoleEntity : function(dataObject, successCallback, errorCallback) {
          $rootScope.loading = true;
          $http({
            method: 'POST',
            url: AWS_URL.roles + 'dev/roles/',
            // url: API_URL.roles + 'v1/roles/',
            data: JSON.stringify(dataObject),
            headers: {
              // 'authToken': AuthService.getToken(),
              'Content-Type' : 'application/json',
              'x-api-key' : '0PoqEC0SZv3xfyjWlnrKz5N2XPu6IPA89ybTQjzf'
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
            url: AWS_URL.roles + 'dev/roles/' + roleId,
            data : dataObject,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : '0PoqEC0SZv3xfyjWlnrKz5N2XPu6IPA89ybTQjzf'
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
            url: AWS_URL.roles + 'dev/roles/' + roleId,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : '0PoqEC0SZv3xfyjWlnrKz5N2XPu6IPA89ybTQjzf'
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
            url: AWS_URL.roles + 'dev/roles',
            // url: API_URL.roles + 'v1/roles',
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : '0PoqEC0SZv3xfyjWlnrKz5N2XPu6IPA89ybTQjzf'
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
            url: AWS_URL.organisationLevel + 'dev/organizationLevels',
            // url: API_URL.organisationLevel + 'v1/orglevels',
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : '4wA98CgTvK1qYvTFYIxGS2RV20Hf3Rf58DXAsVda'
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
            url: AWS_URL.users + 'dev/users/',
            // url: API_URL.users + 'v1/users/',
            data: JSON.stringify(dataObject),
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : '6M9hgzFoVs76jpp7JDRsO5MavisvNOpI3Lv5Wjf1'
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
            url: AWS_URL.users + 'dev/users/'+ id,
            // url: API_URL.users + 'v1/users/'+ id,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : '6M9hgzFoVs76jpp7JDRsO5MavisvNOpI3Lv5Wjf1'
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
            url: AWS_URL.users + 'dev/users?pageSize=' + pageSize + "&pageNumber=" + pageNumber,
            // url: API_URL.users + 'v1/users?pageSize=' + pageSize + "&pageNumber=" + pageNumber,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : '6M9hgzFoVs76jpp7JDRsO5MavisvNOpI3Lv5Wjf1'
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
            url: AWS_URL.users + 'dev/users?pageSize=' + pageSize + "&pageNumber=" + pageNumber + "&" + searchStr,
            // url: API_URL.users + 'v1/users?pageSize=' + pageSize + "&pageNumber=" + pageNumber + "&" + searchStr,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : '6M9hgzFoVs76jpp7JDRsO5MavisvNOpI3Lv5Wjf1'
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
            url: AWS_URL.users + 'dev/users/' + userId,
            // url: API_URL.users + 'v1/users/' + userId,
            data: JSON.stringify(dataObject),
            headers: {
              // 'authToken': AuthService.getToken(),
              'Content-Type' : 'application/json',
              'x-api-key' : '6M9hgzFoVs76jpp7JDRsO5MavisvNOpI3Lv5Wjf1'
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
            url: AWS_URL.users + 'dev/users/' + userId,
            headers: {
              'Content-Type' : 'application/json',
              'x-api-key' : '6M9hgzFoVs76jpp7JDRsO5MavisvNOpI3Lv5Wjf1'
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
