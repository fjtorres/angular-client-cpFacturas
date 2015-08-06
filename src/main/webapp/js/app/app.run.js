angular.module('cpFacturasApp').constant('app.version', '0.0.1');

angular.module('cpFacturasApp').run(['$rootScope', '$location', '$translate', '$cookieStore', '$timeout', 'authenticationService', 'app.version', function($rootScope, $location, $translate, $cookieStore, $timeout, authenticationService, appVersion){
    
    $rootScope.redirectTo = function ( path ) {
        $location.path( path );
    };

    $rootScope.currentLanguage = function () {
        return $translate.use();
    }

    $rootScope.changeLanguage = function (lang) {
        if ($rootScope.currentLanguage() !== lang) {
            $translate.use(lang);
        }
    };

    $translate('app.title').then(function (text) {
        $rootScope.appTitle = text;
    });

    $rootScope.appVersion = appVersion;

    var hiddenLoader = function () {
    	$timeout(function() {
    		$rootScope.loading = false;
    	}, 500);
    }
    
    $rootScope.$on("$routeChangeStart", function (event, next, current){
    	$rootScope.loading = true;
    	
        if (current === undefined) {
            $location.path("/login");
        } else if (current != undefined && current.access != undefined && current.access.allowAnonymous && $rootScope.loggedInUser == null) {
            if (next.originalPath != "/login") {
                $location.path("/login");
            }
        }
    });
    
    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
    	hiddenLoader();
    });
    
    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
    	hiddenLoader();
    });

    /* Security configuration */
    $rootScope.logout = function () {
        
        authenticationService.logout(function(){
            delete $rootScope.loggedInUser;
            delete $rootScope.user;
            delete $rootScope.authToken;
            $cookieStore.remove('authToken');
            $rootScope.redirectTo ('/login');
        });
        
    };

    $rootScope.hasRole = function(role) {
            
        if ($rootScope.user === undefined) {
            return false;
        }
        
        if ($rootScope.user.roles[role] === undefined) {
            return false;
        }
        
        return $rootScope.user.roles[role];
    };

    var authToken = $cookieStore.get('authToken');
    if (authToken !== undefined) {
        $rootScope.authToken = authToken;
        authenticationService.get(function(user){
            $rootScope.user = user;
            $rootScope.loggedInUser = true;
            $rootScope.redirectTo("/");
        });
    }

}]);