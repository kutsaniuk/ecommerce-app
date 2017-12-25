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
        vm.message = {};

        vm.removeProduct = removeProduct;
        vm.submitMessage = submitMessage;

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

        function removeProduct(slug) {
            function success(response) {
                $log.info(response);

                $state.go('admin.products', null, {reload: true});
            }

            function failed(response) {
                $log.error(response);
            }

            ProductService
                .removeProduct(slug)
                .then(success, failed);
        }
        
        function submitMessage() {
            function success(response) {
                $log.info(response);

                Notification.success('Message Sent!');
            }

            function failed(response) {
                $log.error(response);
            } 

            ProductService
                .sendMessage(vm.message)
                .then(success, failed);
        }

    }
})();
