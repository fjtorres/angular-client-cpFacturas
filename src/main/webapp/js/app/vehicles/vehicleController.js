(function() {
  'use strict';

  function VehicleController ($routeParams, myConfig, genericService, vehiclesService, vehicleBrandsService, vehicleModelsService, customerService, insurerService, enumService) {
		var vm = this;
		vm.brands = [];
		vm.selectedBrand = null;
		vm.models = [];
		vm.customers = [];
		vm.doors = [2, 3, 5]; // TODO LOAD FROM SERVER
		vm.entity = {'id': -1};
		vm.isUpdate = false;
		
		var listCache = genericService.getCache("listCache", true);
		
		// Load years information
		if (listCache.get("VEHICLE_YEARS_LIST") == undefined) {
			var currentYear = new Date().getFullYear();
			var years = [currentYear];
			for (var i=1;i<myConfig.VEHICLE_MAX_YEARS;i++) {
				years.push(currentYear - i);
			};
			
		    listCache.put("VEHICLE_YEARS_LIST", years);
		}
		vm.years = listCache.get("VEHICLE_YEARS_LIST");

		// Load fuel types
		if (listCache.get("VEHICLE_FUEL_LIST") == undefined) {
			enumService.fuelTypes().then(function(response){
				listCache.put("VEHICLE_FUEL_LIST", response.data);
				vm.fuelTypeList = listCache.get("VEHICLE_FUEL_LIST");
			});
		} else {
			vm.fuelTypeList = listCache.get("VEHICLE_FUEL_LIST");
		}
	
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
  
	angular.module('cpFacturasApp').controller('vehicleController', ['$routeParams', 'myConfig', 'genericService', 'vehiclesService', 'vehicleBrandsService', 'vehicleModelsService', 'customerService', 'insurerService', 'enumService', VehicleController]);

}());