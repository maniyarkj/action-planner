'use strict';

angular.module('apApp.adminModules.controllers')
    .controller('DepartmentListCtrl', ['$scope', '$rootScope', 'AdminServices', '$state', 'PAGE_SIZE', '$log', '$timeout', 'STATUS_CODE',
        function($scope, $rootScope, AdminServices, $state, PAGE_SIZE, $log, $timeout, STATUS_CODE)
        {
            var vm = this;
            $rootScope.alerts = [];
            var alert = {};

            vm.pageSizeObj = PAGE_SIZE.rows;
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
            
            function onSuccessgetAllDepts(response) {
                if (STATUS_CODE.status_ok === response.status) {
                    vm.result = response.data.body.body.data;
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
            function onErrorgetAllDepts() {
                alert = {
                    type: 'danger',
                    msg: 'Sorry, something went wrong, please try again!'
                };
                $rootScope.alerts.push(alert);
            }

            vm.pageChanged = function(pageNo) {
                AdminServices.getAllDepts(vm.maxSize, vm.currentPage - 1, onSuccessgetAllDepts, onErrorgetAllDepts);
            };

            vm.init = function()  {
                vm.selectedPageSize = vm.pageSizeObj[0];
                vm.maxSize = vm.selectedPageSize.value;
                vm.currentPage = 1;
                vm.expand = true;
                AdminServices.getAllDepts(vm.maxSize, vm.currentPage - 1, onSuccessgetAllDepts, onErrorgetAllDepts);
            };

            vm.redirectToEditMode = function(dept) {
                $state.go('app.admin-department', {
                    'id' : dept._id
                });
            }

            vm.changePageSize = function() {
                vm.maxSize = vm.selectedPageSize.value;
                AdminServices.getAllDepts(vm.maxSize, vm.currentPage - 1, onSuccessgetAllDepts, onErrorgetAllDepts);
            }

            // Filters
            vm.searchWithFilter = function() {
                var searchStr = '';
                if (vm.deptId !== undefined && vm.deptId !== '' && vm.deptId !== null) {
                    searchStr += 'deptId=' + vm.deptId + '&';
                }
                if (vm.deptName !== undefined && vm.deptName !== '' && vm.deptName !== null) {
                    searchStr += 'deptName=' + vm.deptName + '&';
                }
                if (vm.orgLevel !== undefined && vm.orgLevel !== '' && vm.orgLevel !== null) {
                    searchStr += 'orgLevel=' + vm.orgLevel.level + '&';
                }
                if (searchStr.length) {
                    searchStr = searchStr.substring(0, searchStr.length - 1);
                    AdminServices.getAllFilteredDepts(vm.maxSize, vm.currentPage -1, searchStr, onSuccessgetAllDepts, onErrorgetAllDepts);
                }
                else {
                    vm.currentPage = 1;
                    AdminServices.getAllDepts(vm.maxSize, vm.currentPage - 1, onSuccessgetAllDepts, onErrorgetAllDepts);
                }
            }
            vm.resetFilter = function() {
                // Reseting the Text Boxes
                vm.deptId = '';
                vm.deptName = '';
                vm.orgLevel = '';
                AdminServices.getAllDepts(vm.maxSize, vm.currentPage - 1, onSuccessgetAllDepts, onErrorgetAllDepts);
            }

            $rootScope.closeAlert = function() {
            $rootScope.alerts = [];
        };
            vm.init();
        }
    ]);
