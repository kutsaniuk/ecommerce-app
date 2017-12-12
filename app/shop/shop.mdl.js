(function () {
    'use strict';
    
    angular
        .module('shop', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('main.shop', {
                url: 'shop',
                templateUrl: '../views/shop/shop.html',
                controller: 'ShopCtrl as vm'
            });
    }
})();
  