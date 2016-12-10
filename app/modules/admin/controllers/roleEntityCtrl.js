'use strict';

angular.module('apApp.adminModules.controllers')
	.controller('RoleEntityCtrl', ['$scope', '$rootScope', function($scope, $rootScope)
	{
		// Initialization
		var vm = this;
		vm.isRoleEntityTreeExpanded = true;
		vm.editRoleEntity = false;

		vm.roleOrgLevelList =
		[
      {
        'name' : 'Corporate',
        'value' : 'CORP'
      },
      {
        'name' : 'Division',
        'value' : 'DIVISION'
      },
      {
        'name' : 'Region',
        'value' : 'REGION'
      },
      {
        'name' : 'District',
        'value' : 'DISTRICT'
      },
      {
        'name' : 'Store',
        'value' : 'STORE'
      },
    ];


		/* Tree View Manipulation Functions */
		// Remove Node from Tree
		vm.remove = function (scope) {
      scope.remove();
    };

		// Expanding/Collapsing Signle Node with it's Sub Nodes
    vm.toggle = function (scope) {
      scope.toggle();
    };

		// Adding New Sub Node
    vm.newSubItem = function (scope) {
      var nodeData = scope.$modelValue;
      nodeData.nodes.push({
        id: nodeData.id * 10 + nodeData.nodes.length,
        title: nodeData.title + '.' + (nodeData.nodes.length + 1),
        nodes: []
      });
    };

		// Collapsing All Nodes
		vm.collapseAll = function () {
			$scope.$broadcast('angular-ui-tree:collapse-all');
			vm.isRoleEntityTreeExpanded = false;
		};


		// Expanding All Nodes
		vm.expandAll = function () {
			$scope.$broadcast('angular-ui-tree:expand-all');
			vm.isRoleEntityTreeExpanded = true;
		};

		// Initialization of Org Level Data.
		vm.roleOrgLevelTree =
		[
	  	{
		    "id": 1,
		    "title": "Level 1",
		    "nodes": [
		      {
		        "id": 11,
		        "title": "Role Corp 1",
		      },
					{
		        "id": 12,
		        "title": "Role Corp 2",
		      },
					{
		        "id": 13,
		        "title": "Role Corp 3",
		      }
		    ]
		  },
		  {
		    "id": 2,
		    "title": "Level 2",
				"nodes": [
					{
		        "id": 21,
		        "title": "Role Div 1",
		      },
					{
		        "id": 22,
		        "title": "Role Div 2",
		      },
					{
		        "id": 23,
		        "title": "Role Div 3",
		      }
				]
		  },
		  {
		    "id": 3,
		    "title": "Level 3",
		    "nodes": [
					{
		        "id": 31,
		        "title": "Role Region 1",
		      },
					{
		        "id": 32,
		        "title": "Role Region 2",
		      },
					{
		        "id": 33,
		        "title": "Role Region 3",
		      }
		    ]
		  }
		];

		/* End of Tree Manipulation Functions */
		//

		// vm.selectedNodeId = 11;
		// console.log(vm.selectedNodeId);
		vm.editEnable = function(rl_node) {
			vm.selectedNodeId = rl_node.id;
			console.log(vm.selectedNodeId);
			vm.editRoleEntity = true;
		};


		vm.removeEnable = function(rl_node) {
			vm.selectedNodeId = {};
			vm.editRoleEntity = false;
		};

		/* Controller Functions */
		// On Success of Save Role Details Call
		function onSuccessSaveRoleDetails() {

		}

		// On Error of Save Role Details Call
		function onErrorSaveRoleDetails() {

		}

		vm.saveRoleEntity = function() {
			var dataObject = {
				'roleId' : vm.roleId,
				'roleName' : vm.roleName,
				'roleOrgLevel' : vm.roleOrgLevel.value
			};
			console.log(dataObject);

			//AdminServices.saveRoleDetails(dataObject, onSuccessSaveRoleDetails, onErrorSaveRoleDetails);
		}
		/* End of Controller Functions */
	}]);
