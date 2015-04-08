(function() {
    'use strict';

    function GenericService($rootScope, $location, $translate) {

        this.redirectTo = function(path) {
            $location.path(path);
        };


        this.translate = function(key, callback) {
            $translate(key).then(function(text) {
                callback(text);
            });
        };
        
        this.showMessage = function (key) {
        	this.translate(key, function (text) {
        		$rootScope.$broadcast('successMessage', text);
        	});
        };
        
        this.showError = function (key) {
        	this.translate(key, function (text) {
        		$rootScope.$broadcast('errorMessage', text);
        	});
        };

        return this;
    }

    angular.module('cpFacturasApp').factory('genericService', ['$rootScope', '$location', '$translate', GenericService]);

}());
