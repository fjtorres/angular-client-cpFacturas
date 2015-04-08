(function() {
  'use strict';

  function CustomerController ($routeParams, $modal, genericService, customerService) {
	    var vm = this;
	    vm.entity = {'id': -1,'type': 'PERSON', 'contactData': {}};
	    vm.isUpdate = false;

	    if ($routeParams.itemId != undefined) {
	        vm.entity = customerService.resource.get({'key': $routeParams.itemId});
	        vm.isUpdate = true;
	    }

	    vm.onSaveSubmit = function () {
	        if (vm.isUpdate) {
	            customerService.resource.update({}, vm.entity, function(){
	            	genericService.showMessage('customers.messages.update.success');
	            	genericService.redirectTo("/customers");
	            });
	        } else {
	            customerService.resource.save({}, vm.entity, function(){
	            	genericService.showMessage('customers.messages.create.success');
	            	genericService.redirectTo("/customers");
	            });
	        }
	    };

	}
  
  angular.module('cpFacturasApp').controller('customerController', ['$routeParams', '$modal', 'genericService', 'customerService', CustomerController]);


}());