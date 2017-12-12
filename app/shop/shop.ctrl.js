(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('ShopCtrl', ShopCtrl);

    function ShopCtrl($stateParams, ProductService, Notification, $log, MEDIA_URL, $state) {
        var vm = this;

        vm.init = function () {
            getProducts();
        };

        vm.params = $stateParams;

        vm.products = [];

        function getProducts() {
            function success(response) {
                $log.info(response);

                vm.products = response.data.objects;
            }

            function failed(response) {
                $log.error(response);
            }

            ProductService
                .getProducts($stateParams)
                .then(success, failed);
        }

    }
})();
