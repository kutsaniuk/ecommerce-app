(function () {
    'use strict';
    
    angular
        .module('admin.messages.preview', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('admin.messages.preview', {
                url: '/preview/:slug',
                data: {
                    is_granted: ['ROLE_ADMIN']
                },
                onEnter: [
                    'ngDialog',
                    'AdminMessagesService',
                    '$stateParams',
                    '$state',
                    '$log',
                    function (ngDialog, AdminMessagesService, $stateParams, $state, $log) {
                        getMessage($stateParams.slug);

                        function getMessage(slug) {
                            function success(response) {
                                openDialog(response.data.object);
                            }

                            function failed(response) {
                                $log.error(response);
                            }

                            AdminMessagesService
                                .getMessageBySlug(slug)
                                .then(success, failed);
                        }

                        function openDialog(data) {

                            var options = {
                                templateUrl: '../views/admin/admin.messages.preview.html',
                                data: data,
                                showClose: true
                            };

                            ngDialog.open(options).closePromise.finally(function () {
                                $state.go('admin.messages');
                            });
                        }
                    }]
            });
    }
})();
 