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

      vm.init = function() {
        vm.newDepartment = true;
        AdminServices.getOrganisationLevels(onSuccessGetOrganizationLevels, onErrorGetOrganizationLevels);
				// Checking whether new form or edit mode.
        if (id !== undefined) {
          vm.newDepartment = false;
          // Calling Data of detached Id
          AdminServices.getIndividualDept(id, onSuccessGetIndividualDept, onErrorGetIndividualDept)
        }
        vm.localeList = LocaleService.getLocalesDisplayNames();
      };

      function onSuccessGetIndividualDept(response) {
        if (STATUS_CODE.status_ok === response.status) {
          // Prompt Role Detail is saved successfully.
          vm.data = response.data.body.body;
        } else {
          alert = {
            type: 'danger',
            msg: 'Sorry, Something went wrong. Could not load department data.'
          };
          $rootScope.alerts.push(alert);
        }
      }

      function onErrorGetIndividualDept() {
        alert = {
          type: 'danger',
          msg: 'Sorry, Something went wrong. Could not load department data.'
        };
        $rootScope.alerts.push(alert);
      }

      function onSuccessEditDept(response) {
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

      function onErrorEditDept(response) {
        alert = {
          type: 'danger',
          msg: 'Sorry, Something went wrong. Please try again!'
        };
        $rootScope.alerts.push(alert);
      }

      function onSuccessSaveDept(response) {
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

      function onErrorSaveDept(response) {
        alert = {
          type: 'danger',
          msg: 'Sorry, Something went wrong. Please try again!'
        };
        $rootScope.alerts.push(alert);
      }
      vm.saveDepartment = function() {
        var dataObject = {
          'deptId': vm.data.departmentId,
          'deptName': vm.data.departmentName,
          'orgLevel': vm.orgLevelNew.level,
          'tenantId': '5'
        };
        if (vm.newDepartment) {
          AdminServices.saveDepartment(dataObject, onSuccessSaveDept, onErrorSaveDept);
        } else {
          AdminServices.updateDepartment(dataObject, id, onSuccessEditDept, onErrorEditDept);
        }
      }

      function onSuccessDeleteDept(response) {
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

      function onErrorGetDeleteDept() {
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
  					AdminServices.deleteDepartment(id, onSuccessDeleteDept, onErrorGetDeleteDept);
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
