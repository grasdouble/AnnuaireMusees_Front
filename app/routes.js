/**
 * Created by sebastien on 09/04/15.
 */
angular.module('AnnuaireMuseeApp').config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});