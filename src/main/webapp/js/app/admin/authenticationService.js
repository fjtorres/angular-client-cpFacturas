'use strict';

angular.module('cpFacturasApp').factory('authenticationService', function($resource, myConfig) {

    var service = $resource(myConfig.apiUrl + '/authentication', {}, {
        authenticate: {
            method: 'POST',
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        },
        logout: {
            url: myConfig.apiUrl + "/authentication/logout",
            method: 'GET'
        }
    });

    return service;
});