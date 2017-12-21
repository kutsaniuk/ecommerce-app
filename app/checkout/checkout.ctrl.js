(function () {
    'use strict'; 
 
    angular
        .module('main')
        .controller('CheckoutCtrl', CheckoutCtrl);

    function CheckoutCtrl($scope, ProductService, Notification, $log, MEDIA_URL, $state) {
        var vm = this;

        vm.shopAdressForm = null;

        vm.sameAsBillingAddress = false;

        vm.billing = {};
        vm.shipping = {};

        vm.steps = {
            shopAddress: {
                visible: true,
                success: false
            },
            shopShip: {
                visible: false,
                success: false
            },
            shopPay: {
                visible: false,
                success: false
            }
        };

        vm.init = function () {
            // openStep('shopAddress');
        };
        
        vm.openStep = openStep;

        function openStep(step) {
            if (vm.shopAdressForm.$invalid) return;

            for (var name in vm.steps)
                vm.steps[name].visible = false;

            vm.steps[step].visible = true;
            vm.steps[step].success = true;
        }

    }
})();
