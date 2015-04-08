'use strict';

angular.module('cpFacturasApp').controller('confirmController', function ($scope, $modalInstance, title, body) {
    
    $scope.title = title;

    $scope.body = body;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});