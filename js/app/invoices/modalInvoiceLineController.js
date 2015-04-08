(function() {
  'use strict';

  function ModalInvoiceLineController ($modalInstance, invoiceService, entity) {
	    
	    var vm = this;
	    vm.entity = entity;
	    
	    vm.onSubmit = function () {
	    	$modalInstance.close(vm.entity);
	    };
	    
	    vm.onCancelClick = function () {
	    	$modalInstance.dismiss('cancel');
	    };
	}
  
  angular.module('cpFacturasApp').controller('modalInvoiceLineController', ['$modalInstance', 'invoiceService', 'entity', ModalInvoiceLineController]);

}());