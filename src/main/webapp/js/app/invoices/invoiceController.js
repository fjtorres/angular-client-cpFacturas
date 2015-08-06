(function() {
  'use strict';

  function InvoiceController ($routeParams, $modal, genericService, vehiclesService, invoiceService) {
		
		var vm = this;
		vm.isUpdate = false;
		vm.vehicleAutocomplete = "";
		vm.entity = {lines: []};
	
	    if ($routeParams.itemId != undefined) {
	    	vm.entity = invoiceService.resource.get({'id': $routeParams.itemId});
	    	vm.isUpdate = true;
	    }
	
	    vm.onSaveSubmit = function () {
	    	
	        if (vm.isUpdate) {
	        	invoiceService.resource.update({}, vm.entity, function(){
	        		genericService.showMessage('invoices.messages.update.success');
	        		genericService.redirectTo("/invoices");
	            });
	        } else {
	        	invoiceService.resource.save({}, vm.entity, function(){
	        		genericService.showMessage('invoices.messages.create.success');
	        		genericService.redirectTo("/invoices");
	            });
	        }
	    };
	   
		vm.getVehicles = function (searchValue) {
			return vehiclesService.autocomplete(searchValue).then(function(response){
				return response.data;
			});
		};
		
		vm.onSelectVehicle = function(item, model, label) {
			vm.entity.vehicle = item;
		};
		
		vm.onClearVehicleClick = function () {
			vm.entity.vehicle = {};
			vm.vehicleAutocomplete = "";
		};
		
		vm.linesGrid = {};
		
		vm.linesGrid.onNewLineClick = function () {
			var modalInstance = $modal.open({
	          templateUrl: 'js/app/invoices/newLine.tpl.html',
	          controller: 'modalInvoiceLineController',
	          controllerAs: 'modalCtrl',
	          size: 'md',
	          resolve: {
	        	  "entity": function () { return {description: "", amount: 0, price: 0, discount: 0, taxRate: 0};}
	          }
	        });

	        modalInstance.result.then(function (newLine) {
	          vm.entity.lines.push(newLine);
	        }, function () {
	          // Empty
	        });
		};
		
		vm.linesGrid.onUpdateLineClick = function (selectedLine) {
			var modalInstance = $modal.open({
	          templateUrl: 'js/app/invoices/newLine.tpl.html',
	          controller: 'modalInvoiceLineController',
	          controllerAs: 'modalCtrl',
	          size: 'md',
	          resolve: {
	        	  "entity": function () {return selectedLine;}
	          }
	        });

	        modalInstance.result.then(function (newLine) {
	          //vm.lines.push(newLine);
	        }, function () {
	          // Empty
	        });
		};
		
		vm.linesGrid.onConfirmDeleteClick = function (selectedLine) {
			var modalInstance = $modal.open({
	          templateUrl: 'js/app/main/confirmation.tpl.html',
	          controller: 'confirmController',
	          size: 'md',
	          resolve: {
	            title: function(){return "messages.confirmation.title";},
	            body: function () {return "invoicesLine.messages.delete.confirmation";}
	          }
	        });

	        modalInstance.result.then(function () {
	          vm.linesGrid.onDelete(selectedLine);
	        }, function () {
	          // Empty
	        });
		};
		
		vm.linesGrid.onDelete = function (lineToRemove) {
			vm.entity.lines.splice(vm.entity.lines.indexOf(lineToRemove), 1);
		};

	}
  
	angular.module('cpFacturasApp').controller('invoiceController', ['$routeParams', '$modal', 'genericService', 'vehiclesService', 'invoiceService', InvoiceController]);

}());