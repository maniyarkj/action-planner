'use strict';

angular.module('apApp.adminModules.controllers')
	.controller('RoleEntityCtrl', ['$scope', '$rootScope', 'AdminServices', 'STATUS_CODE', '$window',
	function($scope, $rootScope, AdminServices, STATUS_CODE, $window)
	{
		// Initialization
		var vm = this;
		vm.editRoleEntity = false;
		$rootScope.alerts = [];
		var alert = {};

		// GET API for Organization levels
		function onSuccessGetOrganizationLevels(response) {
			if (STATUS_CODE.status_ok === response.status) {
				vm.roleOrgLevelList = response.data;
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
		AdminServices.getOrganizationLevels(onSuccessGetOrganizationLevels, onErrorGetOrganizationLevels);

		/* CRUD Operations for Roles */

		// Save Role Details
		function onSuccessSaveRoleEntity(response) {
			if (STATUS_CODE.status_ok === response.status) {
				// Prompt Role Detail is saved successfully.
				alert = {
					type: 'success',
					msg: 'Role entity saved successfully.'
				};

				// Reseting the Text Boxes
				$scope.roleEntityForm.$setPristine();
				$scope.roleEntityForm.$setUntouched();

				vm.roleId = '';
				vm.roleName = '';
				vm.roleOrgLevel = '';

				$rootScope.alerts.push(alert);
			 	AdminServices.getRoles(onSuccessGetRoles, onErrorGetRoles);
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
				'roleOrgLevel' : vm.roleOrgLevel.id,
				'tenantId' : "5"
			};
			AdminServices.saveRoleEntity(dataObject, onSuccessSaveRoleEntity, onErrorSaveRoleEntity);
		}

		// Get Roles
		function onSuccessGetRoles(response) {
			if (STATUS_CODE.status_ok === response.status) {
				vm.allRoles = response.data;
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
		AdminServices.getRoles(onSuccessGetRoles, onErrorGetRoles);

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
				'roleId' : role.roleId,
				'roleName' : role.roleName,
				'roleOrgLevel' : vm.selectedOrgLevel.id
			};
			AdminServices.updateRoleEntity(dataObject, role._id, onSuccessUpdateRoleEntity, onErrorUpdateRoleEntity);
		}

		// Delete Role Details
		function onSuccessDeleteRoleEntity(response) {
			if (STATUS_CODE.status_ok === response.status) {
				alert = {
					type: 'success',
					msg: 'Role entity deleted successfully.'
				};
				$rootScope.alerts.push(alert);
				AdminServices.getRoles(onSuccessGetRoles, onErrorGetRoles);
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
			AdminServices.deleteRoleEntity(role._id, onSuccessDeleteRoleEntity, onErrorDeleteRoleEntity);
		}

		vm.editEnable = function(role) {
			vm.selectedNodeId = role._id;
			vm.editRoleEntity = true;
		};

		vm.removeEnable = function(role) {
			vm.selectedNodeId = {};
			vm.editRoleEntity = false;
			vm.roleOrgLevel = role.roleOrgLevel.id;
		};


		$rootScope.closeAlert = function() {
     	$rootScope.alerts = [];
   	};
		/* End of Controller Functions */
	}]);
