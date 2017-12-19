(function () {
    'use strict';
    
    angular
        .module('admin.products.edit', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('admin.products.edit', {
                url: '/edit/:slug',
                onEnter: [
                'ngDialog',
                'ProductService',
                '$stateParams',
                '$state',
                '$log',
                function (ngDialog, ProductService, $stateParams, $state, $log) {
                    getWatch($stateParams.slug);
    
                    function getWatch(slug) {
                        function success(response) {
                            openDialog(response.data.object);
                        }
    
                        function failed(response) {
                            $log.error(response);
                        }

                        ProductService
                            .getProductBySlug(slug)
                            .then(success, failed);
                    }
    
                    function openDialog(data) {
    
                        var options = {
                            templateUrl: '../views/admin/admin.products.edit.html',
                            data: data,
                            controller: 'AdminProductsEdit as vm',
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
 