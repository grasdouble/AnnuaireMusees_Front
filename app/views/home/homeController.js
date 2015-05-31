angular.module('AnnuaireMuseeApp').controller('HomeController',
    function ($http) {
        $http.get('http://annuaire-musees-server.dev/musee/').
            success(function (data) {
                this.data = data;
            });
    }
);