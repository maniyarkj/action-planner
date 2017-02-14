'use strict';

angular.module('apApp.adminModules.controllers')
  .controller('DepartmentCtrl',
    ['$scope', '$stateParams', 'AdminServices', '$state', 'STATUS_CODE', '$window', '$rootScope', 'LocaleService', '$uibModal', 'CONFIRM',
    function($scope, $stateParams, AdminServices, $state, STATUS_CODE, $window, $rootScope, LocaleService, $uibModal, CONFIRM) {
      var vm = this,
        id = $stateParams.id,
        alert = {};

      $rootScope.alerts = [];

      function onSuccessGetOrganizationLevels(response) {
  			if (STATUS_CODE.status_ok === response.status) {
  				vm.orgLevelList = response.data.body.body;
  			}
  			else {
  				alert = {
  					type: 'danger',
  					msg: 'Sorry, No data found!'
  				};
  				$rootScope.alerts.push(alert);
  			}
  		}
  		function onErrorGetOrganizationLevels(response) {
  			alert = {
  				type: 'danger',
  				msg: 'Sorry, something went wrong, please try again!'
  			};
  			$rootScope.alerts.push(alert);
  		}
  		AdminServices.getOrganisationLevels(onSuccessGetOrganizationLevels, onErrorGetOrganizationLevels);


      vm.init = function() {
        vm.newDepartment = true;
				// Checking whether new form or edit mode.
        if (id !== undefined) {
          vm.newDepartment = false;
          // Calling Data of detached Id
          AdminServices.getIndividualDepartment(id, onSuccessGetIndividualDepartment, onErrorGetIndividualDepartment)
        }

        vm.localeList = LocaleService.getLocalesDisplayNames();
      };

      function onSuccessGetIndividualDepartment(response) {
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
            msg: 'Sorry, Something went wrong. Could not load department data.'
          };
          $rootScope.alerts.push(alert);
        }
      }

      function onErrorGetIndividualDepartment() {
        alert = {
          type: 'danger',
          msg: 'Sorry, Something went wrong. Could not load department data.'
        };
        $rootScope.alerts.push(alert);
      }

      function onSuccessEditDepartment(response) {
        if (STATUS_CODE.status_ok === response.status) {
          // Prompt Role Detail is saved successfully.
          alert = {
            type: 'success',
            msg: 'Department data modified successfully.'
          };
          $rootScope.alerts.push(alert);
          $state.go('app.admin-department-list');
        } else {
          alert = {
            type: 'danger',
            msg: 'Sorry, Something went wrong. Please try again!'
          };
          $rootScope.alerts.push(alert);
        }
      }

      function onErrorEditDepartment(response) {
        alert = {
          type: 'danger',
          msg: 'Sorry, Something went wrong. Please try again!'
        };
        $rootScope.alerts.push(alert);
      }

      function onSuccessSaveDepartment(response) {
        if (STATUS_CODE.status_ok === response.status) {
          alert = {
            type: 'success',
            msg: 'Department saved successfully.'
          };
          $rootScope.alerts.push(alert);
          $state.go('app.admin-department-list');
        } else {
          alert = {
            type: 'danger',
            msg: 'Sorry, Something went wrong. Please try again!'
          };
          $rootScope.alerts.push(alert);
        }
      }

      function onErrorSaveDepartment(response) {
        alert = {
          type: 'danger',
          msg: 'Sorry, Something went wrong. Please try again!'
        };
        $rootScope.alerts.push(alert);
      }
      vm.saveDepartment = function() {
        var dataObject = {
          'departmentId': vm.data.departmentId,
          'departmentName': vm.data.departmentName,
          'orgLevel': vm.orgLevelNew,
          'tenantId': '5'
        };

        console.log('called');

        if (vm.newDepartment) {
          AdminServices.saveDepartment(dataObject, onSuccessSaveDepartment, onErrorSaveDepartment);
        } else {
          AdminServices.updateDepartment(dataObject, id, onSuccessEditDepartment, onErrorEditDepartment);
        }
      }

      function onSuccessDeleteDepartment(response) {
        if (STATUS_CODE.status_ok === response.status) {
          alert = {
            type: 'success',
            msg: 'Department deleted successfully.'
          };
          $rootScope.alerts.push(alert);
          $state.go('app.admin-department-list');
        } else {
          alert = {
            type: 'danger',
            msg: 'Sorry, Something went wrong. Please try again!'
          };
          $rootScope.alerts.push(alert);
        }
      }

      function onErrorGetDeleteDepartment() {
        alert = {
          type: 'danger',
          msg: 'Sorry, Something went wrong. Please try again!'
        };
        $rootScope.alerts.push(alert);
      }
      vm.deleteDepartment = function() {
        var modalInstance = $uibModal.open({
  				templateUrl: 'views/layout/confirm-box.html',
  				controller: 'ConfirmBoxCtrl',
  				size: 'sm'
  			});

  			modalInstance.result.then(function (response) {
  	      if (response === CONFIRM.confirm_yes) {
  					AdminServices.deleteDepartment(id, onSuccessDeleteDepartment, onErrorGetDeleteDepartment);
  				}
  	    }, function () {
  	    });
      };
      vm.cancelDepartments = function() {
        $window.history.back();
      }
      $rootScope.closeAlert = function() {
        $rootScope.alerts = [];
      };
      vm.init();
    }
  ]);
