'use strict';

angular.module('apApp.adminModules.controllers', [])
	.controller('RoleEntityCtrl', function($scope, $rootScope)
	{
		var vm = this;

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
		};

		// Expanding All Nodes
		vm.expandAll = function () {
			$scope.$broadcast('angular-ui-tree:expand-all');
		};

		// Initialization of Org Level Data.
		vm.roleOrgLevel =
		[
	  	{
		    "id": 1,
		    "title": "node1",
		    "nodes": [
		      {
		        "id": 11,
		        "title": "node1.1",
		        "nodes": [
		          {
		            "id": 111,
		            "title": "node1.1.1",
		            "nodes": []
		          }
		        ]
		      },
		      {
		        "id": 12,
		        "title": "node1.2",
		        "nodes": []
		      }
		    ]
		  },
		  {
		    "id": 2,
		    "title": "node2",
		    "nodrop": true,
		    "nodes": [
		      {
		        "id": 21,
		        "title": "node2.1",
		        "nodes": []
		      },
		      {
		        "id": 22,
		        "title": "node2.2",
		        "nodes": []
		      }
		    ]
		  },
		  {
		    "id": 3,
		    "title": "node3",
		    "nodes": [
		      {
		        "id": 31,
		        "title": "node3.1",
		        "nodes": []
		      }
		    ]
		  }
		];

		/* End of Tree Manipulation Functions */

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
				'roleOrgLevel' : vm.roleOrgLevel
			};
			console.log(dataObject);

			AdminServices.saveRoleDetails(dataObject, onSuccessSaveRoleDetails, onErrorSaveRoleDetails);
		}
		/* End of Controller Functions */
	});
