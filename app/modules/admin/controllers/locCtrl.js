'use strict';

angular.module('apApp.adminModules.controllers')
  .controller('LocationCtrl', ['$scope', '$stateParams', 'AdminServices', '$state', 'STATUS_CODE', '$window', '$rootScope', 'LocaleService',
    function($scope, $stateParams, AdminServices, $state, STATUS_CODE, $window, $rootScope, LocaleService) {
      var vm = this,
      id = $stateParams.id,
      alert = {};

      $rootScope.alerts = [];
      vm.init = function() {
        vm.newLoc = true;        
        vm.data = {};

        // Checking whether new form or edit mode.
        if (id !== undefined) {
          vm.newLoc = false;
          // Calling Data of detached Id
          AdminServices.getIndividualUser(id, onSuccessGetIndividualUser, onErrorGetIndividualUser)
        }

        vm.localeList = LocaleService.getLocalesDisplayNames();
      };

      function onSuccessGetIndividualUser(response) {
        if (STATUS_CODE.status_ok === response.status) {
          // Prompt Role Detail is saved successfully.
          vm.data = response.data.body.body;

          if (vm.data.dateOfBirth !== undefined || vm.data.dateOfBirth !== null || vm.data.dateOfBirth === '') {
            vm.data.dateOfBirth = new Date(vm.data.dateOfBirth);
          }
          if (vm.data.hireDate !== undefined || vm.data.hireDate !== null || vm.data.hireDate === '') {
            vm.data.hireDate = new Date(vm.data.hireDate);
          }

          if (vm.data.status !== undefined || vm.data.status !== null || vm.data.status === '') {
            vm.data.status = 'Active';
          }
        } else {
          alert = {
            type: 'danger',
            msg: 'Sorry, Something went wrong. Could not load user data.'
          };
          $rootScope.alerts.push(alert);
        }
      }

      function onErrorGetIndividualUser() {
        alert = {
          type: 'danger',
          msg: 'Sorry, Something went wrong. Could not load user data.'
        };
        $rootScope.alerts.push(alert);
      }

      function onSuccessEditUser(response) {
        if (STATUS_CODE.status_ok === response.status) {
          // Prompt Role Detail is saved successfully.
          alert = {
            type: 'success',
            msg: 'User data modified successfully.'
          };
          $rootScope.alerts.push(alert);
          $state.go('app.admin-user-list');
        } else {
          alert = {
            type: 'danger',
            msg: 'Sorry, Something went wrong. Please try again!'
          };
          $rootScope.alerts.push(alert);
        }
      }

      function onErrorEditUser(response) {
        alert = {
          type: 'danger',
          msg: 'Sorry, Something went wrong. Please try again!'
        };
        $rootScope.alerts.push(alert);
      }

      function onSuccessSaveUser(response) {
        if (STATUS_CODE.status_ok === response.status) {
          alert = {
            type: 'success',
            msg: 'User saved successfully.'
          };
          $rootScope.alerts.push(alert);
          $state.go('app.admin-user-list');
        } else {
          alert = {
            type: 'danger',
            msg: 'Sorry, Something went wrong. Please try again!'
          };
          $rootScope.alerts.push(alert);
        }
      }

      function onErrorSaveUser(response) {
        alert = {
          type: 'danger',
          msg: 'Sorry, Something went wrong. Please try again!'
        };
        $rootScope.alerts.push(alert);
      }
      vm.saveDept = function() {
        
        var dataObject = [{
          'departmentId': vm.data.deptId,
          'deptName': vm.data.deptName,
          'orgLevel': vm.data.orgLevel,
          'tenantId': vm.data.parentDeptId
        }];

        if (vm.newLoc) {
          AdminServices.saveDept(dataObject, onSuccessSaveUser, onErrorSaveUser);
        } else {
          AdminServices.updateDept(dataObject, id, onSuccessEditUser, onErrorEditUser);
        }
      }

      function onSuccessDeleteUser(response) {
        if (STATUS_CODE.status_ok === response.status) {
          alert = {
            type: 'success',
            msg: 'User deleted successfully.'
          };
          $rootScope.alerts.push(alert);
          $state.go('app.admin-user-list');
        } else {
          alert = {
            type: 'danger',
            msg: 'Sorry, Something went wrong. Please try again!'
          };
          $rootScope.alerts.push(alert);
        }
      }

      function onErrorGetDeleteUser() {
        alert = {
          type: 'danger',
          msg: 'Sorry, Something went wrong. Please try again!'
        };
        $rootScope.alerts.push(alert);
      }
      vm.deleteUser = function() {
        AdminServices.deleteUser(id, onSuccessDeleteUser, onErrorGetDeleteUser);
      };
      vm.cancelDept = function() {
        $window.history.back();
      }
      $rootScope.closeAlert = function() {
        $rootScope.alerts = [];
      };
      vm.init();
    }
  ]);
