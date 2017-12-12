
(function () {
    'use strict';
    
    angular
        .module('product', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('main.product', {
                url: 'product/:id',
                templateUrl: '../views/product/product.html',
                controller: 'ProductCtrl as vm'
            });
    }
})();
  