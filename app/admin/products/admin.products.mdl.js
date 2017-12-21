(function () {
    'use strict';
    
    angular
        .module('admin.products', [
            'admin.products.edit',
            'admin.products.add'
        ])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('admin.products', {
                url: 'products?key&value',
                templateUrl: '../views/admin/admin.products.html',
                controller: 'ShopCtrl as vm',
                data: {
                    is_granted: ['ROLE_ADMIN']
                }
            });
    }
    
})();
 