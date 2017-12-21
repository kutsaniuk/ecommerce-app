(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('AdminOrdersCtrl', AdminOrdersCtrl);

    function AdminOrdersCtrl($rootScope, $scope, Notification, AdminOrdersService, Flash, $log) {
        var vm = this;

        vm.getOrders = getOrders; 
        vm.removeOrder = removeOrder;
        vm.totalPrice = totalPrice;

        vm.orders = [];

        function getOrders() {
            function success(response) {
                vm.orders = response.data.objects;

            }

            function failed(response) {
                $log.error(response);
            }

            AdminOrdersService
                .getOrders()
                .then(success, failed);
        }

        function removeOrder(slug) {
            function success(response) {
                getOrders();
                Notification.success(response.data.message);
            }

            function failed(response) {
                Notification.error(response.data.message);
            }

            AdminOrdersService
                .removeOrder(slug)
                .then(success, failed);
        }
        
        function totalPrice(products) {
            var total = 0;

            products.forEach(function (item) {
                total += parseInt(item.metadata.price);
            });

            return total;
        }
    }
})();
