(function () {
    'use strict';
    
    angular
        .module('admin.messages', [
            'admin.messages.preview'
        ])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('admin.messages', {
                url: 'messages',
                templateUrl: '../views/admin/admin.messages.html',
                controller: 'AdminMessagesCtrl as vm',
                data: {
                    is_granted: ['ROLE_ADMIN']
                }
            });
        
        
    }
    
})();
 