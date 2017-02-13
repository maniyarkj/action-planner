'use strict';

angular.module('apApp.adminModules.controllers')
	.controller('UserListCtrl', ['$scope', '$rootScope', 'AdminServices', '$state', 'PAGE_SIZE', '$log', '$timeout', 'STATUS_CODE',
		function($scope, $rootScope, AdminServices, $state, PAGE_SIZE, $log, $timeout, STATUS_CODE)
		{
			var vm = this;
			$rootScope.alerts = [];
			var alert = {};

			vm.pageSizeObj = PAGE_SIZE.rows;

			function onSuccessGetAllUsers(response) {
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
			function onErrorGetAllUsers() {
				alert = {
					type: 'danger',
					msg: 'Sorry, something went wrong, please try again!'
				};
				$rootScope.alerts.push(alert);
			}

			vm.pageChanged = function(pageNo) {
				AdminServices.getAllUsers(vm.maxSize, vm.currentPage - 1, onSuccessGetAllUsers, onErrorGetAllUsers);
			};

			vm.init = function()  {
				vm.selectedPageSize = vm.pageSizeObj[0];
				vm.maxSize = vm.selectedPageSize.value;
				vm.currentPage = 1;
				vm.expand = true;
				AdminServices.getAllUsers(vm.maxSize, vm.currentPage - 1, onSuccessGetAllUsers, onErrorGetAllUsers);
			};

			vm.redirectToEditMode = function(user) {
				$state.go('app.admin-user', {
					'id' : user._id
				});
			}

			vm.changePageSize = function() {
				vm.maxSize = vm.selectedPageSize.value;
				AdminServices.getAllUsers(vm.maxSize, vm.currentPage - 1, onSuccessGetAllUsers, onErrorGetAllUsers);
			}

			// Filters
			vm.searchWithFilter = function() {
				var searchStr = '';
				if (vm.userId !== undefined && vm.userId !== '' && vm.userId !== null) {
					searchStr += 'userId=' + vm.userId + '&';
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
					AdminServices.getAllFilteredUsers(vm.maxSize, vm.currentPage -1, searchStr, onSuccessGetAllUsers, onErrorGetAllUsers);
				}
				else {
					vm.currentPage = 1;
					AdminServices.getAllUsers(vm.maxSize, vm.currentPage - 1, onSuccessGetAllUsers, onErrorGetAllUsers);
				}
			}
			vm.resetFilter = function() {
				// Reseting the Text Boxes
				vm.userId = '';
				vm.firstName = '';
				vm.lastName = '';
				vm.emailId = '';
				vm.phoneNumber = '';
				vm.location = '';
				vm.status = '';
				AdminServices.getAllUsers(vm.maxSize, vm.currentPage - 1, onSuccessGetAllUsers, onErrorGetAllUsers);
			}

			$rootScope.closeAlert = function() {
	     	$rootScope.alerts = [];
	   	};
			vm.init();
		}
	]);
