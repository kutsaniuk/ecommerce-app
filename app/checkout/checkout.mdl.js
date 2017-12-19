(function () {
    'use strict';
    
    angular
        .module('checkout', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('main.checkout', {
                url: 'checkout',
                templateUrl: '../views/checkout/checkout.html',
                controller: 'CheckoutCtrl as vm'
            });
    }
})();
  