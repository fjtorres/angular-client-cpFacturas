'use strict';

angular.module('cpFacturasApp').controller('menuController', ['$scope', '$rootScope', '$location', MenuController]);

function MenuController ($scope, $rootScope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    $scope.isActiveGroup = function (viewGroup) { 
        return $location.path().indexOf(viewGroup) > -1 ;
    };
}