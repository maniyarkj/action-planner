'use strict';

angular.module('apApp.adminModules.controllers')
	.controller('DepartmentListCtrl', ['$scope', '$rootScope', 'AdminServices', '$state', 'PAGE_SIZE', '$log', '$timeout', 'STATUS_CODE',
		function($scope, $rootScope, AdminServices, $state, PAGE_SIZE, $log, $timeout, STATUS_CODE)
		{
			var vm = this;
			$rootScope.alerts = [];
			var alert = {};

			vm.pageSizeObj = PAGE_SIZE.rows;

			function onSuccessGetAllDepartments(response) {
				if (STATUS_CODE.status_ok === response.status) {
					vm.result = response.data.body.body;
					vm.totalItems = vm.result.count;
					vm.pSize = vm.result.pageSize;
				}
				else {
					alert = {
						type: 'danger',
						msg: 'Sorry, No data found!'
					};
					$rootScope.alerts.push(alert);
				}
			}
			function onErrorGetAllDepartments() {
				alert = {
					type: 'danger',
					msg: 'Sorry, something went wrong, please try again!'
				};
				$rootScope.alerts.push(alert);
			}

			vm.pageChanged = function(pageNo) {
				AdminServices.getAllDepartments(vm.maxSize, vm.currentPage - 1, onSuccessGetAllDepartments, onErrorGetAllDepartments);
			};

			vm.init = function()  {
				vm.selectedPageSize = vm.pageSizeObj[0];
				vm.maxSize = vm.selectedPageSize.value;
				vm.currentPage = 1;
				vm.expand = true;
				AdminServices.getAllDepartments(vm.maxSize, vm.currentPage - 1, onSuccessGetAllDepartments, onErrorGetAllDepartments);
			};

			vm.redirectToEditMode = function(department) {
				$state.go('app.admin-department', {
					'id' : department._id
				});
			}

			vm.changePageSize = function() {
				vm.maxSize = vm.selectedPageSize.value;
				AdminServices.getAllDepartments(vm.maxSize, vm.currentPage - 1, onSuccessGetAllDepartments, onErrorGetAllDepartments);
			}

			// Filters
			vm.searchWithFilter = function() {
				var searchStr = '';
				if (vm.departmentId !== undefined && vm.departmentId !== '' && vm.departmentId !== null) {
					searchStr += 'departmentId=' + vm.departmentId + '&';
				}
				if (vm.firstName !== undefined && vm.firstName !== '' && vm.firstName !== null) {
					searchStr += 'firstName=' + vm.firstName + '&';
				}
				if (vm.lastName !== undefined && vm.lastName !== '' && vm.lastName !== null) {
					searchStr += 'lastName=' + vm.lastName + '&';
				}
				if (vm.emailId !== undefined && vm.emailId !== '' && vm.emailId !== null) {
					searchStr += 'emailId=' + vm.emailId + '&';
				}
				if (vm.phoneNumber !== undefined && vm.phoneNumber !== '' && vm.phoneNumber !== null) {
					searchStr += 'phoneNo=' + vm.phoneNumber + '&';
				}
				if (vm.location !== undefined && vm.location !== '' && vm.location !== null) {
					searchStr += 'location=' + vm.location + '&';
				}
				if (vm.status !== undefined && vm.status !== '' && vm.status !== null) {
					searchStr += 'status=' + vm.status + '&';
				}

				if (searchStr.length) {
					searchStr = searchStr.substring(0, searchStr.length - 1);
					AdminServices.getAllFilteredDepartments(vm.maxSize, vm.currentPage -1, searchStr, onSuccessGetAllDepartments, onErrorGetAllDepartments);
				}
				else {
					vm.currentPage = 1;
					AdminServices.getAllDepartments(vm.maxSize, vm.currentPage - 1, onSuccessGetAllDepartments, onErrorGetAllDepartments);
				}
			}
			vm.resetFilter = function() {
				// Reseting the Text Boxes
				vm.departmentId = '';
				vm.firstName = '';
				vm.lastName = '';
				vm.emailId = '';
				vm.phoneNumber = '';
				vm.location = '';
				vm.status = '';
				AdminServices.getAllDepartments(vm.maxSize, vm.currentPage - 1, onSuccessGetAllDepartments, onErrorGetAllDepartments);
			}

			$rootScope.closeAlert = function() {
	     	$rootScope.alerts = [];
	   	};
			vm.init();
		}
	]);
