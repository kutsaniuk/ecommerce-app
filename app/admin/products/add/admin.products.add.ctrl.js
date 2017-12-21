(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('AdminProductsAdd', AdminProductsAdd);

    function AdminProductsAdd($state, ProductService, Notification, $log, $scope, MEDIA_URL, ngDialog) {
        var vm = this;

        vm.updateProduct = updateProduct;
        vm.upload = upload;

        vm.uploadProgress = [0, 0, 0];

        vm.event = {};
        vm.flow = {};

        vm.flowConfig = {
            target: MEDIA_URL,
            singleFile: false
        };

        function updateProduct(product) {
            function success(response) {
                $log.info(response);

                Notification.primary(
                    {
                        message: 'Saved',
                        delay: 800,
                        replaceMessage: true
                    }
                );

                $state.go('admin.products', null, {reload: true});
                ngDialog.close();
            }

            function failed(response) {
                $log.error(response);
            }


            if (vm.flow.files.length &&
                vm.uploadProgress[0] === 100 &&
                vm.uploadProgress[1] === 100 &&
                vm.uploadProgress[2] === 100)
                ProductService
                    .createProduct(product)
                    .then(success, failed);
            else
                ProductService
                    .createProduct(product)
                    .then(success, failed);
        }

        function upload() {
            vm.flow.files.forEach(function (item, i) {
                if (i < 3)
                    ProductService
                        .upload(item.file)
                        .then(function(response){

                            $scope.ngDialogData.metafields[1].children[i].value = response.media.name;

                        }, function(){
                            console.log('failed :(');
                        }, function(progress){
                            vm.uploadProgress[i] = progress;
                        });
            });

        }

    }
})();
