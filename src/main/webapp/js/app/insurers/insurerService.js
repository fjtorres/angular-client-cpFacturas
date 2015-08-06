'use strict';

angular.module('cpFacturasApp').factory('insurerService', ['$resource', '$http', 'myConfig', function($resource, $http, myConfig) {

	var mixing = {};
	
    mixing.resource = $resource(myConfig.apiUrl + '/insurers/:id', {key: '@id'}, {
        search : {method: 'GET'},
        update: {method: 'PUT'},
        remove: {method: 'DELETE'}
    });

    mixing.autocomplete = function (text) {
    	return $http.get(myConfig.apiUrl + '/insurers/search', {params: {"searchText": text}});
    }
    
    return mixing;
    
}]);