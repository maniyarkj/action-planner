'use strict';

angular.module('apApp.adminModules.controllers')
	.controller('UserCtrl', function($scope, $rootScope)
	{
		var vm = this;

		vm.openBirthDate = function() {
      vm.openedBirthDate = true;
    };

		vm.today = function() {
        vm.dateOfBirth = new Date();
    };
    vm.today();
    vm.dateOptions = {
      formatYear: 'yyyy',
      maxDate: new Date(),
      startingDay: 1
    };

		vm.openHireDate = function() {
			vm.openedHireDate = true;
		}

		vm.localeList =
		[
			{
				'name' : 'en-US',
				'value' : '1'
			},
			{
				'name' : 'de-De',
				'value' : '2'
			},
			{
				'name' : 'jp-JP',
				'value' : '3'
			}
		];

	});
