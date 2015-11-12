'use strict';

angular.module('cpFacturasApp').controller('loginController', ['$scope', '$rootScope', '$cookieStore', 'authenticationService', LoginController]);

function LoginController ($scope, $rootScope, $cookieStore, authenticationService) {

    // Clear scope vars
    $scope.credentials = {};
    $scope.rememberMe = false;

    $scope.login = function () {
        authenticationService.authenticate($.param({username: $scope.credentials.username, password: $scope.credentials.password}), function (authenticationResult) {
            $rootScope.authToken = authenticationResult.token;
            
            if ($scope.rememberMe) {
            	$cookieStore.put('authToken', $rootScope.authToken);
            }

            authenticationService.get(function(user){
                $rootScope.user = user;
                $rootScope.loggedInUser = true;
                $scope.redirectTo("/");
            });
        });
    };

}