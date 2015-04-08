'use strict';

angular.module('cpFacturasApp').controller('mainController', ['$scope', MainController]);

function MainController ($scope, $location) {

    $scope.newInvoice = function () {
        $scope.redirectTo ('/invoices/create');
    };

    $scope.showInvoices = function () {
        $scope.redirectTo ('/invoices');
    };

    $scope.showCustomers = function () {
        $scope.redirectTo ('/customers');
    };

    $scope.showCompanyCustomers = function () {
        $scope.redirectTo ('/customers/companies');
    };

    $scope.showVehicles = function () {
        $scope.redirectTo ('/vehicles');
    };

    $scope.showConfiguration = function () {
        $scope.redirectTo ('/');
    };
}