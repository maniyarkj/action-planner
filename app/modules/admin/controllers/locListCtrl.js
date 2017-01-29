'use strict';

angular.module('apApp.adminModules.controllers')
    .controller('LocationListCtrl', ['$scope', '$rootScope', 'AdminServices', '$state', 'PAGE_SIZE', '$log', '$timeout', 'STATUS_CODE',
        function($scope, $rootScope, AdminServices, $state, PAGE_SIZE, $log, $timeout, STATUS_CODE)
        {
            var vm = this;
            $rootScope.alerts = [];
            var alert = {};

            vm.pageSizeObj = PAGE_SIZE.rows;

            function onSuccessgetAllLocs(response) {
                if (STATUS_CODE.status_ok === response.status) {
                    vm.result = response.data.body.body;
                    console.log("vm.result",vm.result);
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
            function onErrorgetAllLocs() {
                alert = {
                    type: 'danger',
                    msg: 'Sorry, something went wrong, please try again!'
                };
                $rootScope.alerts.push(alert);
            }

            vm.pageChanged = function(pageNo) {
                AdminServices.getAllLocs(vm.maxSize, vm.currentPage - 1, onSuccessgetAllLocs, onErrorgetAllLocs);
            };

            vm.init = function()  {
                vm.selectedPageSize = vm.pageSizeObj[0];
                vm.maxSize = vm.selectedPageSize.value;
                vm.currentPage = 1;
                vm.expand = true;
                AdminServices.getAllLocs(vm.maxSize, vm.currentPage - 1, onSuccessgetAllLocs, onErrorgetAllLocs);
            };

            vm.redirectToEditMode = function(user) {
                $state.go('app.admin-user', {
                    'id' : user._id
                });
            }

            vm.changePageSize = function() {
                vm.maxSize = vm.selectedPageSize.value;
                AdminServices.getAllLocs(vm.maxSize, vm.currentPage - 1, onSuccessgetAllLocs, onErrorgetAllLocs);
            }

            // Filters
            vm.searchWithFilter = function() {
                var searchStr = '';
                if (vm.locationId !== undefined && vm.locationId !== '' && vm.locationId !== null) {
                    searchStr += 'locationId=' + vm.locationId + '&';
                }
                if (vm.locationName !== undefined && vm.locationName !== '' && vm.locationName !== null) {
                    searchStr += 'locationName=' + vm.locationName + '&';
                }
                if (vm.parentLocationId !== undefined && vm.parentLocationId !== '' && vm.parentLocationId !== null) {
                    searchStr += 'parentLocationId=' + vm.parentLocationId + '&';
                }
                if (vm.locationOrgLevel !== undefined && vm.locationOrgLevel !== '' && vm.locationOrgLevel !== null) {
                    searchStr += 'locationOrgLevel=' + vm.locationOrgLevel + '&';
                }
                if (vm.status !== undefined && vm.status !== '' && vm.status !== null) {
                    searchStr += 'status=' + vm.status + '&';
                }
                
                if (searchStr.length) {
                    searchStr = searchStr.substring(0, searchStr.length - 1);
                    AdminServices.getAllFilteredLocs(vm.maxSize, vm.currentPage -1, searchStr, onSuccessgetAllLocs, onErrorgetAllLocs);
                }
                else {
                    vm.currentPage = 1;
                    AdminServices.getAllLocs(vm.maxSize, vm.currentPage - 1, onSuccessgetAllLocs, onErrorgetAllLocs);
                }
            }
            vm.resetFilter = function() {
                // Reseting the Text Boxes
                vm.locationId = '';
                vm.locationName = '';
                vm.parentLocationId = '';
                vm.locationOrgLevel = '';
                vm.status = '';
                AdminServices.getAllLocs(vm.maxSize, vm.currentPage - 1, onSuccessgetAllLocs, onErrorgetAllLocs);
            }

            $rootScope.closeAlert = function() {
            $rootScope.alerts = [];
        };
            vm.init();
        }
    ]);
