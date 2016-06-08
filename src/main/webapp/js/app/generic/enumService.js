(function() {
    'use strict';

    function EnumService($resource, $http, myConfig) {

    	var mixing = {};
    	
        mixing.fuelTypes = function () {
        	return $http.get(myConfig.apiUrl + '/enum/fuelTypes');
        };

        return mixing;
    }

    angular.module('cpFacturasApp').factory('enumService', ['$resource', '$http', 'myConfig', EnumService]);

}());
