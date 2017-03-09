'use strict';

angular.module('apApp.adminModules.controllers')
	.controller('RoleEntityCtrl',
	['$scope', '$rootScope', 'AdminServices', 'STATUS_CODE', '$window', '_', '$uibModal', 'CONFIRM',
	function($scope, $rootScope, AdminServices, STATUS_CODE, $window, _, $uibModal, CONFIRM)
	{
		// Initialization
		var vm = this;
		vm.editRoleEntity = false;
		$rootScope.alerts = [];
		$rootScope.loading = false;
		vm.allRoles = [];
		var alert = {};

		// GET API for Organization levels
		function onSuccessGetOrganizationLevels(response) {
			if (STATUS_CODE.status_ok === response.status) {
				vm.roleOrgLevelList = response.data.body.body;
				AdminServices.getRoles(onSuccessGetRoles, onErrorGetRoles);
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

		/* CRUD Operations for Roles */

		vm.cancelRoles = function() {
			$scope.roleEntityForm.$setPristine();
			$scope.roleEntityForm.$setUntouched();

			vm.roleId = '';
			vm.roleName = '';
			vm.roleOrgLevelNew = '';
		};

		// Save Role Details
		function onSuccessSaveRoleEntity(response) {
			if (STATUS_CODE.status_ok === response.status) {
				// Prompt Role Detail is saved successfully.
				alert = {
					type: 'success',
					msg: 'Role entity saved successfully.'
				};

				vm.allRoles = [];
				AdminServices.getRoles(onSuccessGetRoles, onErrorGetRoles);
				
				// vm.allRoles.push(
				// 	{
				// 		'_id' :	response.data.body.body._id,
				// 		'createdAt' : response.data.body.body.createdAt,
				// 		'deleted' : response.data.body.body.deleted,
				// 		'lastUser' : response.data.body.body.lastUser,
				// 		'roleId' : response.data.body.body.roleId,
				// 		'roleName' : response.data.body.body.roleName,
				// 		'roleOrgLevelName' : getRoleOrgLevelName(response.data.body.body.roleOrgLevel),
				// 		'roleOrgLevel' : response.data.body.body.roleOrgLevel,
				// 		'tenantId' : response.data.body.body.tenantId
				// 	}
				// );

				// Reseting the Text Boxes
				$scope.roleEntityForm.$setPristine();
				$scope.roleEntityForm.$setUntouched();

				vm.roleId = '';
				vm.roleName = '';
				vm.roleOrgLevelNew = '';

				$rootScope.alerts.push(alert);
			}
			else {
				alert = {
					type: 'danger',
					msg: 'Sorry, Something went wrong. Please try again!'
				};
				$rootScope.alerts.push(alert);
			}
		}
		function onErrorSaveRoleEntity(response) {
			alert = {
				type: 'danger',
				msg: 'Sorry, Something went wrong. Please try again!'
			};
			$rootScope.alerts.push(alert);
		}
		vm.saveRoleEntity = function() {
			var dataObject = {
				'roleId' : vm.roleId,
				'roleName' : vm.roleName,
				'roleOrgLevel' : vm.roleOrgLevelNew.orgLevelId,
				'tenantId' : "5"
			};
			AdminServices.saveRoleEntity(dataObject, onSuccessSaveRoleEntity, onErrorSaveRoleEntity);
		}

		function getRoleOrgLevelName(id) {
			if (vm.roleOrgLevelList !== undefined && vm.roleOrgLevelList.length) {
				var ind = _.findIndex(vm.roleOrgLevelList, {'orgLevelId' : id});
				if (ind > -1) {
					return vm.roleOrgLevelList[ind].name;
				}
				else {
					return null;
				}
			}
			return null;
		}
		// Get Roles
		function onSuccessGetRoles(response) {
			if (STATUS_CODE.status_ok === response.status) {
				var result = response.data.body.body;
				if (result.length) {
					_.each(result, function(data) {
						vm.allRoles.push(
							{
								'_id' :	data._id,
								'createdAt' : data.createdAt,
								'deleted' : data.deleted,
								'lastUser' : data.lastUser,
								'roleId' : data.roleId,
								'roleName' : data.roleName,
								'roleOrgLevelName' : getRoleOrgLevelName(data.roleOrgLevel),
								'roleOrgLevel' : data.roleOrgLevel,
								'tenantId' : data.tenantId
							}
						);
					});
				}
			}
			else {
				alert = {
					type: 'danger',
					msg: 'Sorry, We are unable to load Roles Data.'
				};
				$rootScope.alerts.push(alert);
			}
		}
		function onErrorGetRoles(response) {
			alert = {
				type: 'danger',
				msg: 'Sorry, We are unable to load Roles Data.'
			};
			$rootScope.alerts.push(alert);
		}
		// AdminServices.getRoles(onSuccessGetRoles, onErrorGetRoles);

		// Update Role Details
		function onSuccessUpdateRoleEntity(response) {
			if (STATUS_CODE.status_ok === response.status) {
				// Prompt Role Detail is saved successfully.
				alert = {
					type: 'success',
					msg: 'Role Entity updated successfully.'
				};
				$rootScope.alerts.push(alert);
				vm.removeEnable(); // Removing enable Mode.

				vm.allRoles = [];
				AdminServices.getRoles(onSuccessGetRoles, onErrorGetRoles);

				// This code is usefull when we have data in Body
				// if (response.body)
				// var ind = _.findIndex(vm.allRoles, {'_id' : vm.roleForUpdate});
				// if (ind > -1) {
				// 	vm.allRoles[ind]._id =	response.data.body.body._id;
				// 	vm.allRoles[ind].createdAt = response.data.body.body.createdAt;
				// 	vm.allRoles[ind].deleted = response.data.body.body.deleted;
				// 	vm.allRoles[ind].lastUser = response.data.body.body.lastUser;
				// 	vm.allRoles[ind].roleId = response.data.body.body.roleId;
				// 	vm.allRoles[ind].roleName = response.data.body.body.roleName;
				// 	vm.allRoles[ind].roleOrgLevelName = getRoleOrgLevelName(response.data.body.body.roleOrgLevel);
				// 	vm.allRoles[ind].roleOrgLevel = response.data.body.body.roleOrgLevel;
				// 	vm.allRoles[ind].tenantId = response.data.body.body.tenantId;
				// }
			}
			else {
				alert = {
					type: 'danger',
					msg: 'Sorry, something went wrong, please try again'
				};
				$rootScope.alerts.push(alert);
				vm.removeEnable();
			}
		}
		function onErrorUpdateRoleEntity(response) {
			alert = {
				type: 'danger',
				msg: 'Sorry, something went wrong, please try again'
			};
			$rootScope.alerts.push(alert);
			vm.removeEnable();
		}
		vm.updateRoleEntity = function(role) {
			var dataObject = {
				'roleName' : role.roleName,
				'roleOrgLevel' : vm.selectedOrgLevel.orgLevelId,
				'tenantId' : 5
			};
			vm.roleForUpdate = role._id;
			AdminServices.updateRoleEntity(dataObject, role._id, onSuccessUpdateRoleEntity, onErrorUpdateRoleEntity);
		}

		// Delete Role Details
		function onSuccessDeleteRoleEntity(response) {
			if (STATUS_CODE.status_ok === response.status) {
				alert = {
					type: 'success',
					msg: 'Role entity deleted successfully.'
				};
				// var ind = _.findIndex(vm.allRoles, {'_id' : vm.roleForDelete});
				// if (ind > -1) {
				// 	vm.allRoles.splice(ind, 1);
				// }
				vm.allRoles = [];
				AdminServices.getRoles(onSuccessGetRoles, onErrorGetRoles);

				$rootScope.alerts.push(alert);
				//AdminServices.getRoles(onSuccessGetRoles, onErrorGetRoles);
			}
			else {
				alert = {
					type: 'danger',
					msg: 'Sorry, something went wrong, please try again'
				};
				$rootScope.alerts.push(alert);
			}
		}
		function onErrorDeleteRoleEntity(response) {
			alert = {
				type: 'danger',
				msg: 'Sorry, something went wrong, please try again'
			};
			$rootScope.alerts.push(alert);
		}
		vm.deleteRoleEntity = function(role) {
			var modalInstance = $uibModal.open({
				templateUrl: 'views/layout/confirm-box.html',
				controller: 'ConfirmBoxCtrl',
				size: 'sm'
			});

			modalInstance.result.then(function (response) {
	      if (response === CONFIRM.confirm_yes) {
					vm.roleForDelete = role._id;
					AdminServices.deleteRoleEntity(role._id, onSuccessDeleteRoleEntity, onErrorDeleteRoleEntity);
				}
	    }, function () {
	    });
		}

		vm.editEnable = function(role) {
			vm.selectedNodeId = role._id;
			if (vm.roleOrgLevelList.length) {
				var ind = _.findIndex(vm.roleOrgLevelList, {'name' : role.roleOrgLevelName});
				if (ind > -1) {
					vm.selectedOrgLevel	= vm.roleOrgLevelList[ind];
				}
			}
			vm.editRoleEntity = true;
		};

		vm.removeEnable = function(role) {
			vm.selectedNodeId = {};
			vm.editRoleEntity = false;
		};

		vm.sortTypeField = 'roleId';
    vm.prevSortType = 'roleId';
    vm.sortReverse = false;

    vm.setSortingType = function(sortByName, $event) {
      vm.sortTypeField = sortByName;
      if (vm.prevSortType === vm.sortTypeField) {
        vm.sortReverse = !vm.sortReverse;
				if (angular.element($event.target).hasClass('sorting_asc')) {
					angular.element($event.target).removeClass('sorting_asc').addClass('sorting_desc');
				}
				else {
					angular.element($event.target).removeClass('sorting_desc').addClass('sorting_asc');
				}
      }
      else {
        vm.prevSortType = vm.sortTypeField;
        vm.sortReverse = false;
				angular.element($event.target).removeClass('sorting').addClass('sorting_desc');
				var siblings = angular.element($event.target).siblings();
				_.each(siblings, function(data) {
					if (angular.element(data).hasClass('sorting_asc')) {
						angular.element(data).removeClass('sorting_asc').addClass('sorting');
					}
					else if (angular.element(data).hasClass('sorting_desc')){
						angular.element(data).removeClass('sorting_desc').addClass('sorting');
					}
				});
      }
    };

		$rootScope.closeAlert = function() {
     	$rootScope.alerts = [];
   	};
		/* End of Controller Functions */
	}]);
