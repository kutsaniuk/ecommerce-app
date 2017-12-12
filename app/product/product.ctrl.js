(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('ProductCtrl', ProductCtrl);

    function ProductCtrl($stateParams, ProductService, Notification, $log, MEDIA_URL, $state) {
        var vm = this;

        vm.init = function () {
            getProductBySlug();
        };

        vm.product = {};

        function getProductBySlug() {
            function success(response) {
                $log.info(response);

                vm.product = response.data.object;
            }

            function failed(response) {
                $log.error(response);
            }

            ProductService
                .getProductBySlug($stateParams.id)
                .then(success, failed);
        }

    }
})();
