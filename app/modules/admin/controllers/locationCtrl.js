'use strict';

angular.module('apApp.adminModules.controllers')
  .controller('LocationCtrl',
    ['$scope', '$stateParams', 'AdminServices', '$state', '$window', '$rootScope', 'LocaleService', '$uibModal', 'STATUS_CODE', 'CONFIRM', 'WEEK',
    function($scope, $stateParams, AdminServices, $state, $window, $rootScope, LocaleService, $uibModal, STATUS_CODE, CONFIRM, WEEK) {
      var vm = this,
        id = $stateParams.id,
        alert = {};
      $rootScope.alerts = [];
      vm.weekDays = WEEK.data;
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
    				vm.locationList = response.data.body.body;
            vm.data.parentLocation = vm.locationList[0];
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
      $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
          hstep: [1, 2, 3],
          mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
        $scope.toggleMode = function() {
          $scope.ismeridian = ! $scope.ismeridian;
        };

        $scope.update = function() {
          var d = new Date();
          d.setHours( 14 );
          d.setMinutes( 0 );
          $scope.mytime = d;
        };

        $scope.changed = function () {
          $log.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function() {
          $scope.mytime = null;
        };
      vm.init = function() {
        vm.newLocation = true;
				vm.data = {};
				vm.data.gender = 'Male';
				vm.data.status = 'Active';
				// Checking whether new form or edit mode.
        if (id !== undefined) {
          vm.newLocation = false;
          // Calling Data of detached Id
          AdminServices.getSpecificLocation(id, onSuccessGetSpecificLocation, onErrorGetSpecificLocation)
        }
      };

      function onSuccessGetSpecificLocation(response) {
        if (STATUS_CODE.status_ok === response.status) {
          // Prompt Role Detail is saved successfully.
          vm.data = response.data.body.body;
          console.log(vm.data);

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
              'tenantId': 5,
              'locationId': vm.data.locationId,
              'locationName': vm.data.locationName,
              'parentLocationId': vm.parentLocation.locationId,
              'locationOrgLevel': vm.orgLevelNew.orgLevelId,
              'status': vm.data.status,
              'streetName': vm.data.streetName,
              'streetNumber': vm.data.streetNumber,
              'postalCode': vm.data.postalCode,
              'city': vm.data.city,
              'state': vm.data.state,
              'country' : vm.data.country,
              'phoneNumber' : vm.data.phoneNumber,
              'faxNumber' : vm.data.faxNumber,
              'timeZone' : vm.data.timeZone,
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
