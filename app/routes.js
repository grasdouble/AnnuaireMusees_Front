/**
 * Created by sebastien on 09/04/15.
 */
angular.module('AnnuaireMuseeApp').config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            //templateUrl: 'app/views/home/home.html',
            //controller: 'HomeController',
            //controllerAs: 'home'
            redirectTo: '/musee'
        })
        .when('/musee', {
            templateUrl: 'app/views/musee/musee.html',
            controller: 'MuseeController',
            controllerAs: 'musee'
        })
        .when('/categorie', {
            templateUrl: 'app/views/categorie/categorie.html',
            controller: 'CategorieController',
            controllerAs: 'categorie'
        })
        .otherwise({
            redirectTo: '/musee'
        });

    $locationProvider.html5Mode(true);
});