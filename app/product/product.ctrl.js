(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('ProductCtrl', ProductCtrl);

    function ProductCtrl($stateParams, ProductService, Notification, $log, MEDIA_URL, $state) {
        var vm = this;
        
        vm.setImage = setImage;

        vm.init = function () {
            getProductBySlug();
        };

        vm.product = {};
        
        vm.currentImage = null;

        function getProductBySlug() {
            function success(response) {
                $log.info(response);

                vm.product = response.data.object;

                setImage(1);
            }

            function failed(response) {
                $log.error(response);
            }

            ProductService
                .getProductBySlug($stateParams.id)
                .then(success, failed);
        }

        function setImage(index) {
            vm.currentImage = vm.product.metadata.images['image_' + index];
        }

    }
})();
