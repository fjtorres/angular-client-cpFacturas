(function() {
    'use strict';

    function GenericService($rootScope, $location, $translate, $cacheFactory) {

    	var mixing = {};
    	
    	mixing.redirectTo = function(path) {
            $location.path(path);
        };


        mixing.translate = function(key, callback) {
            $translate(key).then(function(text) {
                callback(text);
            });
        };
        
        mixing.showMessage = function (key) {
        	mixing.translate(key, function (text) {
        		$rootScope.$broadcast('successMessage', text);
        	});
        };
        
        mixing.showError = function (key) {
        	mixing.translate(key, function (text) {
        		$rootScope.$broadcast('errorMessage', text);
        	});
        };

        mixing.getCache = function (cacheId, create) {
        	if (create === undefined) {
        		create = true;
        	}
        	
        	var cache = $cacheFactory.get(cacheId);
        	
        	if (cache === undefined && create === true) {
        		cache = $cacheFactory(cacheId);
        	}
        	
        	return cache;
        };
        
        mixing.getCacheValue = function (cacheId, valueId) {
        	var value = undefined, cache = mixing.getCache(cacheId);
        	if (cache !== undefined) {
        		value = cache.get(valueId);
        	}
        	return value;
        };
        

        return mixing;
    }

    angular.module('cpFacturasApp').factory('genericService', ['$rootScope', '$location', '$translate', '$cacheFactory', GenericService]);

}());
