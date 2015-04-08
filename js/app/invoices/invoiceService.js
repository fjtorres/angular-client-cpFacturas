'use strict';

angular.module('cpFacturasApp').factory('invoiceService', ['$resource', '$http', 'myConfig', function($resource, $http, myConfig) {

	var mixing = {};
	
    mixing.resource = $resource(myConfig.apiUrl + '/invoices/:id', {key: '@id'}, {
        search : {method: 'GET'},
        update: {method: 'PUT'},
    });

    return mixing;
    
}]);