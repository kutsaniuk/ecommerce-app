(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('AdminMessagesCtrl', AdminMessagesCtrl);

    function AdminMessagesCtrl($rootScope, $scope, Notification, AdminMessagesService, Flash, $log) {
        var vm = this;

        vm.getMessages = getMessages; 
        vm.removeMessage = removeMessage;

        vm.messages = [];

        function getMessages() {
            function success(response) {
                vm.messages = response.data.objects;
            }

            function failed(response) {
                $log.error(response);
            }

            AdminMessagesService
                .getMessages()
                .then(success, failed);
        }

        function removeMessage(slug) {
            function success(response) {
                getMessages();
                Notification.success(response.data.message);
            }

            function failed(response) {
                Notification.error(response.data.message);
            }

            AdminMessagesService
                .removeMessage(slug)
                .then(success, failed);
        }
    }
})();
