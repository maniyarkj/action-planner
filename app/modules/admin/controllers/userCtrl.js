'use strict';

angular.module('apApp.adminModules.controllers')
  .controller('UserCtrl', ['$scope', '$stateParams', 'AdminServices', '$state', 'STATUS_CODE', '$window', '$rootScope', 'LocaleService',
    function($scope, $stateParams, AdminServices, $state, STATUS_CODE, $window, $rootScope, LocaleService) {
      var vm = this,
        id = $stateParams.id,
        alert = {};

      vm.openCalendarHireDate = function() {
        vm.openedHireDate = true;
      };
      vm.openCalendarBirthDate = function() {
        vm.openedBirthDate = true;
      };
			vm.openBirthDate = function() {
				vm.openedBirthDate = true;
			};
			vm.openHireDate = function() {
				vm.openedHireDate = true;
			}

      $rootScope.alerts = [];
      vm.init = function() {
        vm.newUser = true;
        vm.dateOptions = {
          maxDate: new Date(),
          startingDay: 1
        };
				vm.data = {};
				vm.data.gender = 'Male';
				vm.data.status = 'Active';
				vm.format = "MM/dd/yyyy";
				vm.dateOptions = {
					formatYear: 'yy',
					maxDate: new Date(),
				};

				// Checking whether new form or edit mode.
        if (id !== undefined) {
          vm.newUser = false;
          // Calling Data of detached Id
          AdminServices.getIndividualUser(id, onSuccessGetIndividualUser, onErrorGetIndividualUser)
        }

        vm.localeList = LocaleService.getLocalesDisplayNames();
      };

      function onSuccessGetIndividualUser(response) {
        if (STATUS_CODE.status_ok === response.status) {
          // Prompt Role Detail is saved successfully.
          vm.data = response.data;

          if (vm.data.dateOfBirth !== undefined || vm.data.dateOfBirth !== null || vm.data.dateOfBirth === '') {
            vm.data.dateOfBirth = new Date(vm.data.dateOfBirth);
          }
          if (vm.data.hireDate !== undefined || vm.data.hireDate !== null || vm.data.hireDate === '') {
            vm.data.hireDate = new Date(vm.data.hireDate);
          }

          if (vm.data.status !== undefined || vm.data.status !== null || vm.data.status === '') {
            vm.data.status = 'Active';
          }

          alert = {
            type: 'success',
            msg: 'User data has been loaded successfully.'
          };
          $rootScope.alerts.push(alert);
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
      vm.saveUser = function() {
        var dataObject = {
          'firstName': vm.data.firstName,
          'lastName': vm.data.lastName,
          'emailId': vm.data.emailId,
          'phoneNo': vm.data.phoneNo,
          'password': vm.data.password,
          'employeeId': vm.data.employeeId,
          'hireDate': vm.data.hireDate,
          'dateOfBirth': vm.data.dateOfBirth,
          'gender': vm.data.gender,
          'userId': vm.data.userId,
          'tenantId': "5",
          'clientId': "5",
          'hintQuestionAnswers': "Hello"
        };

        if (vm.newUser) {
          AdminServices.saveUser(dataObject, onSuccessSaveUser, onErrorSaveUser);
        } else {
          AdminServices.updateUser(dataObject, id, onSuccessEditUser, onErrorEditUser);
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
      $rootScope.closeAlert = function() {
        $rootScope.alerts = [];
      };
      vm.init();
    }
  ]);
