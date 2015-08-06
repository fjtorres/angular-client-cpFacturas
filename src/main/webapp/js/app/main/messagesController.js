(function() {
  'use strict';

	function MessagesController ($scope, $timeout) {
	    
		var vm = this;
		vm.alerts = [];
		
		vm.addAlert = function (type, message) {
			var alert = {
				"type": type,
				"msg": message
			};
			
			alert.close = function(){
			    vm.alerts.splice(vm.alerts.indexOf(this), 1);
			}
			
			vm.alerts.push(alert);
			
			$timeout(function(){
			    vm.alerts.splice(vm.alerts.indexOf(alert), 1);
			}, 3000);
		};
		
		$scope.$on('successMessage', function (event, message) {
	        vm.addAlert("success", message);
	    });
	
	    $scope.$on('errorMessage', function (event, message) {
	    	vm.addAlert("danger", message);
	    });
	    
	    $scope.$on('clearMessage', function (event) {
	    	vm.alerts = [];
	    });
	}

	angular.module('cpFacturasApp').controller('messagesController', ['$scope', '$timeout', MessagesController]);

}());