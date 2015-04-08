'use strict';

angular.module('cpFacturasApp', ['ngRoute', 'ngResource', 'ngCookies', 'ngAnimate', 'pascalprecht.translate', 'ui.bootstrap'])
.constant("myConfig", {
        "apiUrl": "http://localhost:8080/server/api"
})
.config(['$routeProvider', '$translateProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $translateProvider, $locationProvider, $httpProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'js/app/main/main.tpl.html',
            controller: 'mainController',
            access: {
                allowAnonymous: false
            }
        })
        .when('/login', {
            templateUrl: 'js/app/admin/login.tpl.html',
            controller: 'loginController'
        })
        .otherwise({
            redirectTo: '/'
        });
    
    // Invoices module
    $routeProvider
        .when('/invoices', {
            templateUrl: 'js/app/invoices/list.tpl.html',
            controller: 'invoiceListController',
            controllerAs: 'ctrl',
            access: {
                allowAnonymous: false
            }
        })
        .when('/invoices/create', {
            templateUrl: 'js/app/invoices/create.tpl.html',
            controller: 'invoiceController',
            controllerAs: 'ctrl',
            access: {
                allowAnonymous: false
            }
        })
        .when('/invoices/update/:itemId', {
            templateUrl: 'js/app/invoices/update.tpl.html',
            controller: 'invoiceController',
            controllerAs: 'ctrl',
            access: {
                allowAnonymous: false
            }
        });

    // Cutomers module
    $routeProvider
        .when('/customers', {
            templateUrl: 'js/app/customers/list.tpl.html',
            controller: 'customerListController',
            controllerAs: 'ctrl',
            access: {
                allowAnonymous: false
            }
        })
        .when('/customers/create', {
            templateUrl: 'js/app/customers/create.tpl.html',
            controller: 'customerController',
            controllerAs: 'ctrl',
            access: {
                allowAnonymous: false
            }
        })
        .when('/customers/update/:itemId', {
            templateUrl: 'js/app/customers/update.tpl.html',
            controller: 'customerController',
            controllerAs: 'ctrl',
            access: {
                allowAnonymous: false
            }
        })
        .when('/companies', {
            templateUrl: 'js/app/customers/companies/list.tpl.html',
            controller: 'customersController',
            access: {
                allowAnonymous: false
            }
        })
        .when('/companies/create', {
            templateUrl: 'js/app/companies/create.tpl.html',
            controller: 'customersController',
            access: {
                allowAnonymous: false
            }
        })
        .when('/companies/update/:itemId', {
            templateUrl: 'js/app/companies/create.tpl.html',
            controller: 'customersController',
            access: {
                allowAnonymous: false
            }
        });
    
    // Vehicles module
	$routeProvider.when('/vehicles', {
            templateUrl: 'js/app/vehicles/list.tpl.html',
            controller: 'vehicleListController',
            controllerAs: 'ctrl',
            access: {
                allowAnonymous: false
            }
        })
        .when('/vehicles/create', {
            templateUrl: 'js/app/vehicles/create.tpl.html',
            controller: 'vehicleController',
            controllerAs: 'ctrl',
            access: {
                allowAnonymous: false
            }
        })
        .when('/vehicles/update/:itemId', {
            templateUrl: 'js/app/vehicles/update.tpl.html',
            controller: 'vehicleController',
            controllerAs: 'ctrl',
            access: {
                allowAnonymous: false
            }
        });

    $translateProvider.useStaticFilesLoader({
      prefix: 'js/app/lang/locale-',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('es');

    /*
    * Register error interceptor
    */
    $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
        return {
            'responseError': function(rejection) {
                var status = rejection.status;
                var config = rejection.config;
                var method = config.method;
                var url = config.url;
                var data = rejection.data;
      
                if (status == 401) {
                    $location.path( "/login" );
                } else if (data && data.errors) {
                    $rootScope.$broadcast('errorMessage', data.errors[0]);
                } else {
                    $rootScope.$broadcast('errorMessage', "ERROR!! Show me in bootstrap alert");
                }
              
                return $q.reject(rejection);
            }
        };
    });

    /*
    * Register auth token interceptor.
    */
    $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
        return {
            'request': function(config) {
                var isRestCall = config.url.indexOf('/api/') != -1;
                if (isRestCall && angular.isDefined($rootScope.authToken)) {
                    config.headers['X-Auth-Token'] = $rootScope.authToken;
                }
                return config || $q.when(config);
            }
        };
    });
    
    // Loader calls
//    $httpProvider.defaults.transformRequest.push(function(data) {
//		$("#page-loader").removeClass("hidden");
//		return data;
//	});
//    
//    $httpProvider.defaults.transformResponse.push(function(data) {
//    	$("#page-loader").addClass("hidden");
//		return data;
//    });
}]);