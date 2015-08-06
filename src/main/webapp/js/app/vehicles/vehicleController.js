(function() {
  'use strict';

  function VehicleController ($routeParams, genericService, vehiclesService, vehicleBrandsService, vehicleModelsService, customerService, insurerService) {
		
		var vm = this;
		vm.brands = [];
		vm.selectedBrand = null;
		vm.models = [];
		vm.customers = [];
		vm.years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015]; // TODO LOAD LAST XX YEARS
		vm.doors = [2, 3, 5]; // TODO LOAD FROM SERVER
		vm.fuelTypeList = [{"id": "Diesel", "name": "Tipo 1"}, {"id": "Hybrid", "name": "Tipo 2"}, {"id": "Electric", "name": "Tipo 3"}, {"id": "Petrol", "name": "Tipo 4"}]; // TODO LOAD FROM SERVER
		vm.entity = {'id': -1};
		vm.isUpdate = false;
	
	    if ($routeParams.itemId != undefined) {
	    	vm.entity = vehiclesService.resource.get({'id': $routeParams.itemId});
	    	vm.isUpdate = true;
	    }
	
	    vm.onSaveSubmit = function () {
	    	
	        if (vm.isUpdate) {
	        	vehiclesService.resource.update({}, vm.entity, function(){
	        		genericService.showMessage('vehicles.messages.update.success');
	        		genericService.redirectTo("/vehicles");
	            });
	        } else {
	        	vehiclesService.resource.save({}, vm.entity, function(){
	        		genericService.showMessage('vehicles.messages.create.success');
	        		genericService.redirectTo("/vehicles");
	            });
	        }
	    };
	    
	    vm.onBrandChange = function () {
			vm.getModels("");
		};
	    
		vm.getCustomers = function (searchValue) {
			return customerService.autocomplete(searchValue).then(function(response){
				return response.data;
			});
		};
		
		vm.getInsurers = function (searchValue) {
			return insurerService.autocomplete(searchValue).then(function(response){
				return response.data;
			});
		};
		
	    vm.getBrands = function (searchValue) {
	    	vehicleBrandsService.resource.query({'searchValue':searchValue}, function(data){
	    		
	    		var firstPreferent = -1;
	    		
	    		angular.forEach(data, function (value, key) {
	    			if (value.preferent) {
	    				if (firstPreferent === -1) {
	    					firstPreferent = key;
	    				}
	    				value.group = "vehicles.messages.groupBy.general";
	    			} else {
	    				value.group = "vehicles.messages.groupBy.others";
	    			}
	    		});
	    		
	    		vm.brands = data;
	    		
	    		if (data.length > 0) {
	    			if (firstPreferent === -1) {
	    				vm.selectedBrand = data[0];
	    			} else {
	    				vm.selectedBrand = data[firstPreferent];
	    			}
				}
	    		
	    		vm.getModels();
	    	});
	    };
	    
	    vm.getModels = function (searchValue) {
	    	if (vm.selectedBrand != null) {
	    		vehicleModelsService.resource.query({'searchValue':searchValue, 'brandId': vm.selectedBrand.id}, function(data) {
	    			vm.models = data;
	    			if (data.length > 0) {
	    				vm.entity.model = data[0];
	    			}
	    		});
	    	} else {
	    		vm.models = [{}];
	    	}
	    };
	    
	    // Call init methods
	    vm.getBrands();
	   
	}
  
	angular.module('cpFacturasApp').controller('vehicleController', ['$routeParams', 'genericService', 'vehiclesService', 'vehicleBrandsService', 'vehicleModelsService', 'customerService', 'insurerService', VehicleController]);

}());