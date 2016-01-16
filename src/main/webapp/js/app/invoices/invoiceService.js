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
    	total2: function (lines, includeTax, onlyTax, taxRate) {
    		var total = 0;
			var utils = this;
			
			if (!angular.isNumber(taxRate)) {
				taxRate = parseInt(taxRate);
			}
			
			angular.forEach(lines, function(line, key) {
				if (onlyTax === true) {
					total += utils.lineTaxAmount(line, taxRate);
				} else if (includeTax === true) {
					total += utils.lineTotalAmount(line, taxRate);
				} else {
					total += (utils.lineSubtotalAmount(line) - utils.lineDiscountAmount(line));
				}
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
		lineTaxAmount: function(line, taxRate) {
			var taxAmount = 0;
			
			if (taxRate > 0) {
				taxAmount = (this.lineSubtotalAmount(line) - this.lineDiscountAmount(line)) * taxRate / 100;
			}
			
			return taxAmount;
		},
		lineTotalAmount: function (line, taxRate) {		
			return this.lineSubtotalAmount(line) - this.lineDiscountAmount(line) + this.lineTaxAmount(line, taxRate);
		}
    };

    return mixing;
    
}]);