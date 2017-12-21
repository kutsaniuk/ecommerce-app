(function () {
    'use strict';
    
    angular
        .module('admin.products.add', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('admin.products.add', {
                url: '/add',
                onEnter: [
                'ngDialog',
                'ProductService',
                '$stateParams',
                '$state',
                '$log',
                function (ngDialog, ProductService, $stateParams, $state, $log) {
                    openDialog(ProductService.product);
                        
                    function openDialog(data) {
    
                        var options = {
                            templateUrl: '../views/admin/admin.products.edit.html',
                            data: data,
                            controller: 'AdminProductsAdd as vm',
                            showClose: true
                        };
    
                        ngDialog.open(options).closePromise.finally(function () {
                            $state.go('admin.products');
                        });
                    }
                }],
                data: {
                    is_granted: ['ROLE_ADMIN']
                }
            });
    }
    
})();
 