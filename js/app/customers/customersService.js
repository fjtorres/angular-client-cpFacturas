'use strict';

angular.module('cpFacturasApp').factory('customerService', ['$resource', '$http', 'myConfig', function($resource, $http, myConfig) {

	var mixing = {};
	
    mixing.resource = $resource(myConfig.apiUrl + '/customers/:id', {key: '@id'}, {
        search : {method: 'GET'},
        update: {method: 'PUT'},
    });

    mixing.autocomplete = function (text) {
    	return $http.get(myConfig.apiUrl + '/customers/search', {params: {"searchText": text}});
    }
    
    return mixing;
    
}]);