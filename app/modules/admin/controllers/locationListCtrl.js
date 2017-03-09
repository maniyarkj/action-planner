'use strict';

angular.module('apApp.adminModules.controllers')
	.controller('LocationListCtrl',
		['$scope', '$rootScope', 'AdminServices', '$state', 'PAGE_SIZE', '$log', '$timeout', 'STATUS_CODE', 'STATUS_ARRAY',
		function($scope, $rootScope, AdminServices, $state, PAGE_SIZE, $log, $timeout, STATUS_CODE, STATUS_ARRAY){
			var vm = this,
			alert = {};
			$rootScope.alerts = [];
			vm.pageSizeObj = PAGE_SIZE.rows;
			vm.statusList = STATUS_ARRAY.data;
			vm.testdata = [];

			vm.collapseAll = function () {
		        $scope.$broadcast('angular-ui-tree:collapse-all');
		    };

		    vm.expandAll = function () {
		    	$scope.$broadcast('angular-ui-tree:expand-all');
		    };

			function onSuccessGetOrganizationLevels(response) {
				if (STATUS_CODE.status_ok === response.status) {
					if (response.data.body.body !== undefined || response.data.body.body !== null) {
						vm.orgLevelList = response.data.body.body.data;
					}
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

			function onSuccessGetAllParentLocations(response) {
				if (STATUS_CODE.status_ok === response.status) {
					if (response.data.body.body !== undefined || response.data.body.body !== null) {
						vm.locationList = response.data.body.body.data;
					}
				}
				else {
					alert = {
						type: 'danger',
						msg: 'Sorry, No data found!'
					};
					$rootScope.alerts.push(alert);
				}
			}
			function onErrorGetAllParentLocations(response) {
				alert = {
					type: 'danger',
					msg: 'Sorry, something went wrong, please try again!'
				};
				$rootScope.alerts.push(alert);
			}
			AdminServices.getAllParentLocations(onSuccessGetAllParentLocations, onErrorGetAllParentLocations);

			function onSuccessGetAllLocations(response) {
				if (STATUS_CODE.status_ok === response.status) {
					if (response.data.body.body !== undefined || response.data.body.body !== null) {
						vm.result = response.data.body.body.data;
						vm.testdata = treeData(vm.result);

						vm.totalItems = vm.result.count;
						vm.pSize = vm.result.pageSize;
					}
				}
				else {
					alert = {
						type: 'danger',
						msg: 'Sorry, No data found!'
					};
					$rootScope.alerts.push(alert);
				}
			}
			function onErrorGetAllLocations() {
				alert = {
					type: 'danger',
					msg: 'Sorry, something went wrong, please try again!'
				};
				$rootScope.alerts.push(alert);
			}
			vm.pageChanged = function(pageNo) {
				AdminServices.getAllLocations(vm.maxSize, vm.currentPage - 1, onSuccessGetAllLocations, onErrorGetAllLocations);
			};
			vm.init = function()  {
				vm.selectedPageSize = vm.pageSizeObj[0];
				vm.maxSize = vm.selectedPageSize.value;
				vm.currentPage = 1;
				vm.expand = true;
				AdminServices.getAllLocations(vm.maxSize, vm.currentPage - 1, onSuccessGetAllLocations, onErrorGetAllLocations);
			};

			vm.redirectToEditMode = function(location) {
				$state.go('app.admin-location', {
					'id' : location._id
				});
			}
			vm.changePageSize = function() {
				vm.maxSize = vm.selectedPageSize.value;
				AdminServices.getAllLocations(vm.maxSize, vm.currentPage - 1, onSuccessGetAllLocations, onErrorGetAllLocations);
			}

			// Filters
			vm.searchWithFilter = function() {
				//vm.parentLocation.locationId = vm.parentLocation.locationId;
				var searchStr = '';
				if (vm.locationId !== undefined && vm.locationId !== '' && vm.locationId !== null) {
					searchStr += 'locationId=' + vm.locationId + '&';
				}
				if (vm.locationName !== undefined && vm.locationName !== '' && vm.locationName !== null) {
					searchStr += 'locationName=' + vm.locationName + '&';
				}
				if (vm.parentLocation !== undefined && vm.parentLocation !== '' && vm.parentLocation !== null && vm.parentLocation.parentLocationId !== undefined) {
					searchStr += 'parentLocationId=' + vm.parentLocation.parentLocationId + '&';
				}
				if (vm.locationOrgLevel !== undefined && vm.locationOrgLevel !== '' && vm.locationOrgLevel !== null && vm.locationOrgLevel.level !== undefined) {
					searchStr += 'locationOrgLevel=' + vm.locationOrgLevel.level + '&';
				}
				if (vm.status !== undefined && vm.status !== '' && vm.status !== null && vm.status.value !== undefined) {
					searchStr += 'status=' + vm.status.value + '&';
				}

				if (searchStr.length) {
					searchStr = searchStr.substring(0, searchStr.length - 1);
					AdminServices.getAllFilteredLocations(vm.maxSize, vm.currentPage -1, searchStr, onSuccessGetAllLocations, onErrorGetAllLocations);
				}
				else {
					vm.currentPage = 1;
					AdminServices.getAllLocations(vm.maxSize, vm.currentPage - 1, onSuccessGetAllLocations, onErrorGetAllLocations);
				}
			}
			vm.resetFilter = function() {
				// Reseting the Text Boxes
				vm.locationId = '';
				vm.locationName = '';
				vm.parentLocation = {} //.parentLocationId = '';
				vm.locationOrgLevel = {} // .orgLevelId = '';
				vm.status = {} // .value = '';
				AdminServices.getAllLocations(vm.maxSize, vm.currentPage - 1, onSuccessGetAllLocations, onErrorGetAllLocations);
			}
			function treeData(data) {
				var groupData = _.groupBy(data, 'locationOrgLevel');
				var mainObj = [];
				var i=0;
				_.forEach(groupData,function(d,k){
				  var obj = {};
				  obj.id = i;
				  obj.title =k;
					console.log(k);
					console.log(d);
				  obj.nodes = [];
				  var j = 0;
					_.forEach(d,function(innerData){
				      var tmp = {};
				      tmp.id = j;
							tmp.locationId = innerData.locationId,
							tmp.locationName = innerData.locationName,
							tmp.locationOrgLevel = innerData.locationOrgLevel,
							tmp.parentLocationId = innerData.parentLocationId;
							tmp.status = innerData.status
				      obj.nodes.push(tmp);
				      j++;
				  });
				  i++;
				  mainObj.push(obj);
				});
				return mainObj;
			}

			$rootScope.closeAlert = function() {
	     	$rootScope.alerts = [];

	   	};
			vm.init();
		}
	]);
