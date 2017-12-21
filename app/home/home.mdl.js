(function () {
    'use strict';
    
    angular
        .module('home', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('main.home', {
                url: '',
                controller: 'ShopCtrl as vm',
                templateUrl: '../views/home/home.html'
            });
    }
})();
  