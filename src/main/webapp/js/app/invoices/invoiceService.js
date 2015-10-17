'use strict';

angular.module('cpFacturasApp').factory('invoiceService', ['$resource', '$http', 'myConfig', function($resource, $http, myConfig) {

	var mixing = {};
	
    mixing.resource = $resource(myConfig.apiUrl + '/invoices/:id', {id: '@id'}, {
        search : {method: 'GET'},
        update: {method: 'PUT'},
        remove: {method: 'DELETE'}
    });
    
    mixing.exportSingle = function (id) {
    	return myConfig.apiUrl + '/invoices/export/' + id;
    };
    
    mixing.utils = {
		total : function (lines) {
			var total = 0;
			var utils = this;
			angular.forEach(lines, function(value, key) {
				total += utils.lineTotalAmount(value);
			});
			
			return total;
		},
		lineSubtotalAmount: function (line) {
			return line.amount * line.price;
		},
		lineDiscountAmount: function (line) {
			var discountAmount = 0;
  		  
			if (line.discount > 0) {
				discountAmount = this.lineSubtotalAmount(line) * line.discount / 100;
			}
			
			return discountAmount;
		},	
		lineTaxAmount: function(line) {
			var taxAmount = 0;

			if (line.taxRate > 0) {
				taxAmount = this.lineSubtotalAmount(line) * line.taxRate / 100;
			}
			
			return taxAmount;
		},
		lineTotalAmount: function (line) {
			return this.lineSubtotalAmount(line) - this.lineDiscountAmount(line) + this.lineTaxAmount(line);
		}
    };

    return mixing;
    
}]);