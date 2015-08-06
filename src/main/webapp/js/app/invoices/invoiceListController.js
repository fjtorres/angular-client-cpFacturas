(function() {
  'use strict';

  function InvoiceListController ($modal, genericService, invoiceService) {
	    
	    var vm = this;
	    
	    vm.items = [];
	    vm.currentPage = 1;
	    vm.totalItems = 0;
	    vm.itemsPerPage = 10;
	    vm.sortField = 'creationDate';
	    vm.sortDirection = 'ASC';
	    
    	vm.onConfirmDeleteClick = function(item){
	        
	        var modalInstance = $modal.open({
	          templateUrl: 'js/app/main/confirmation.tpl.html',
	          controller: 'confirmController',
	          size: 'md',
	          resolve: {
	            title: function(){return "messages.confirmation.title";},
	            body: function () {return "invoices.messages.delete.confirmation";}
	          }
	        });

	        modalInstance.result.then(function () {
	          vm.onDelete(item);
	        }, function () {
	          // Empty
	        });
	    };

	    vm.onDelete = function (item) {
	    	invoiceService.resource.remove({"id":item.id}, function () {
	        	genericService.showMessage('customers.messages.delete.success');
	        	vm.onSearch();
	        });
	    };

	    vm.onSearch = function () {
	    	invoiceService.resource.search({'page': vm.currentPage - 1, 'pageSize': vm.itemsPerPage, 'sortField': vm.sortField, 'sortDirection': vm.sortDirection}, function (result) {
	            vm.items = result.list;
	            vm.totalItems = result.total;
	        });
	        
	    };

	    vm.onPageChanged = function () {
	        vm.onSearch();
	    };

	    vm.onExportClick = function (item) {
	    	window.open(invoiceService.exportSingle(item.id));
	    };
	    
	    vm.onSearch();
	    
	}
  
  angular.module('cpFacturasApp').controller('invoiceListController', ['$modal', 'genericService', 'invoiceService', InvoiceListController]);

}());