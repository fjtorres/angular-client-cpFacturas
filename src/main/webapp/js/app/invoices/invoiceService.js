'use strict';

angular.module('cpFacturasApp').factory('invoiceService', ['$resource', '$http', 'myConfig', function($resource, $http, myConfig) {

	var mixing = {};
	
    mixing.resource = $resource(myConfig.apiUrl + '/invoices/:id', {id: '@id'}, {
        search : {method: 'GET'},
        update: {method: 'PUT'},
        remove: {method: 'DELETE'}
    });
    
    mixing.exportSingle = function (id) {
    	return myConfig.apiUrl + '/invoices/export/' + id;
    };

    return mixing;
    
}]);