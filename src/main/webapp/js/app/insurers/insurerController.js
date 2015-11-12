(function() {
  'use strict';

  function InsurerController ($routeParams, $modal, genericService, insurerService) {
	    var vm = this;
	    vm.entity = {'contactData': {}};
	    vm.isUpdate = false;

	    if ($routeParams.itemId != undefined) {
	        vm.entity = insurerService.resource.get({'id': $routeParams.itemId});
	        vm.isUpdate = true;
	    }

	    vm.onSaveSubmit = function () {
	        if (vm.isUpdate) {
	        	insurerService.resource.update({}, vm.entity, function(){
	            	genericService.showMessage('insurers.messages.update.success');
	            	genericService.redirectTo("/insurers");
	            });
	        } else {
	        	insurerService.resource.save({}, vm.entity, function(){
	            	genericService.showMessage('insurers.messages.create.success');
	            	genericService.redirectTo("/insurers");
	            });
	        }
	    };

	}
  
  angular.module('cpFacturasApp').controller('insurerController', ['$routeParams', '$modal', 'genericService', 'insurerService', InsurerController]);


}());