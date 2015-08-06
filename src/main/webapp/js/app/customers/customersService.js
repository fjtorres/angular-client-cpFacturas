'use strict';

angular.module('cpFacturasApp').factory('customerService', ['$resource', '$http', 'myConfig', function($resource, $http, myConfig) {

	var mixing = {};
	
    mixing.resource = $resource(myConfig.apiUrl + '/customers/:id', {id: '@id'}, {
        search : {method: 'GET'},
        update: {method: 'PUT'},
        remove: {method: 'DELETE'}
    });

    mixing.autocomplete = function (text) {
    	return $http.get(myConfig.apiUrl + '/customers/search', {params: {"searchText": text}});
    }
    
    return mixing;
    
}]);