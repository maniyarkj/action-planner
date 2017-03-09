'use strict';

angular.module('apApp.adminModules.controllers')
  .controller('LocationCtrl',
    ['$scope', '$stateParams', 'AdminServices', '$state', '$window', '$rootScope', 'LocaleService', '$uibModal', '$timeout', 'STATUS_CODE', 'CONFIRM', 'WEEK', 'TIMEZONE',
    function($scope, $stateParams, AdminServices, $state, $window, $rootScope, LocaleService, $uibModal, $timeout, STATUS_CODE, CONFIRM, WEEK, TIMEZONE) {
      var vm = this,
        id = $stateParams.id,
        alert = {};
      $rootScope.alerts = [];
      vm.weekDays = WEEK.data;
      vm.timeZoneList = TIMEZONE.data;


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

      function onSuccessGetAllParentLocations(response) {
        if (STATUS_CODE.status_ok === response.status) {
          if (response.data.body.body !== undefined || response.data.body.body !== null) {
    				vm.parentLocationList = response.data.body.body.data;
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

      var sTime = new Date();
      sTime.setHours(9);
      sTime.setMinutes(0);
      $scope.startTime = sTime;

      var eTime = new Date();
      eTime.setHours(21);
      eTime.setMinutes(0);
      $scope.endTime = eTime;

      $scope.hstep = 1;
      $scope.mstep = 15;

      $scope.ismeridian = true;
      $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
      };

      vm.changedStartTime = function(data) {
        console.log(data);
        console.log($scope.startTime);
      };

      vm.init = function() {
        vm.newLocation = true;
				vm.data = {};
				vm.data.gender = 'Male';
				vm.data.status = 'Active';
        vm.data.timeZone = vm.timeZoneList[0];
				// Checking whether new form or edit mode.
        if (id !== undefined) {
          vm.newLocation = false;
          // Calling Data of detached Id
          AdminServices.getSpecificLocation(id, onSuccessGetSpecificLocation, onErrorGetSpecificLocation)
        }
      };

      function onSuccessGetSpecificLocation(response) {
        if (STATUS_CODE.status_ok === response.status) {
          vm.data = response.data.body.body;
          console.log(vm.data);

          $timeout(function() {
            var orgLevel = _.findIndex(vm.orgLevelList, {'level' : vm.data.locationOrgLevel });
  					orgLevel > -1 ? vm.orgLevelNew = vm.orgLevelList[orgLevel] : '';

            var parentId = _.findIndex(vm.parentLocationList, {'parentLocationId' : vm.data.parentLocationId });
  					parentId > -1 ? vm.parentLocation = vm.parentLocationList[parentId] : '';
          }, 100);

          if (vm.data.status !== undefined || vm.data.status !== null || vm.data.status === '') {
            vm.data.status = 'Active';
          }
        } else {
          alert = {
            type: 'danger',
            msg: 'Sorry, Something went wrong. Could not load location data.'
          };
          $rootScope.alerts.push(alert);
        }
      }
      function onErrorGetSpecificLocation() {
        alert = {
          type: 'danger',
          msg: 'Sorry, Something went wrong. Could not load location data.'
        };
        $rootScope.alerts.push(alert);
      }

      function onSuccessEditLocation(response) {
        if (STATUS_CODE.status_ok === response.status) {
          // Prompt Role Detail is saved successfully.
          alert = {
            type: 'success',
            msg: 'Location data modified successfully.'
          };
          $rootScope.alerts.push(alert);
          $state.go('app.admin-location-list');
        } else {
          alert = {
            type: 'danger',
            msg: 'Sorry, Something went wrong. Please try again!'
          };
          $rootScope.alerts.push(alert);
        }
      }
      function onErrorEditLocation(response) {
        alert = {
          type: 'danger',
          msg: 'Sorry, Something went wrong. Please try again!'
        };
        $rootScope.alerts.push(alert);
      }

      function onSuccessSaveLocation(response) {
        if (STATUS_CODE.status_ok === response.status) {
          alert = {
            type: 'success',
            msg: 'Location saved successfully.'
          };
          $rootScope.alerts.push(alert);
          $state.go('app.admin-location-list');
        } else {
          alert = {
            type: 'danger',
            msg: 'Sorry, Something went wrong. Please try again!'
          };
          $rootScope.alerts.push(alert);
        }
      }
      function onErrorSaveLocation(response) {
        alert = {
          type: 'danger',
          msg: 'Sorry, Something went wrong. Please try again!'
        };
        $rootScope.alerts.push(alert);
      }
      vm.saveLocation = function() {
        var dataObject =
        {
          'locations' : [
            {
              'tenantId': 'tenantId',
              'locationId': vm.data.locationId,
              'locationName': vm.data.locationName,
              'parentLocationId': vm.parentLocation.locationId,
              'locationOrgLevel': vm.orgLevelNew.level,
              'status': vm.data.status,
              'streetName': vm.data.streetName,
              'streetNumber': vm.data.streetNumber,
              'postalCode': vm.data.postalCode,
              'city': vm.data.city,
              'state': vm.data.state,
              'country' : vm.data.country,
              'phoneNumber' : vm.data.phoneNumber,
              'faxNumber' : vm.data.faxNumber,
              'timeZone' : vm.data.timeZone.utctAdjustment,
              "operatingHours": {
                    "endTime": "@!39",
                    "closed": 129
                }
            }
          ]
        };

        if (vm.newLocation) {
          AdminServices.saveLocation(dataObject, onSuccessSaveLocation, onErrorSaveLocation);
        } else {
          AdminServices.updateLocation(dataObject, id, onSuccessEditLocation, onErrorEditLocation);
        }
      }

      function onSuccessDeleteLocation(response) {
        if (STATUS_CODE.status_ok === response.status) {
          alert = {
            type: 'success',
            msg: 'Location deleted successfully.'
          };
          $rootScope.alerts.push(alert);
          $state.go('app.admin-location-list');
        } else {
          alert = {
            type: 'danger',
            msg: 'Sorry, Something went wrong. Please try again!'
          };
          $rootScope.alerts.push(alert);
        }
      }
      function onErrorGetDeleteLocation() {
        alert = {
          type: 'danger',
          msg: 'Sorry, Something went wrong. Please try again!'
        };
        $rootScope.alerts.push(alert);
      }
      vm.deleteLocation = function() {
        var modalInstance = $uibModal.open({
  				templateUrl: 'views/layout/confirm-box.html',
  				controller: 'ConfirmBoxCtrl',
  				size: 'sm'
  			});

  			modalInstance.result.then(function (response) {
          console.log(response);
  	      if (response === CONFIRM.confirm_yes) {
  					AdminServices.deleteLocation(id, onSuccessDeleteLocation, onErrorGetDeleteLocation);
  				}
  	    }, function () {
  	    });
      };
      vm.cancelLocations = function() {
        $window.history.back();
      }
      $rootScope.closeAlert = function() {
        $rootScope.alerts = [];
      };
      vm.init();
    }
  ]);
