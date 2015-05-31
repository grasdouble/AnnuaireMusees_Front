angular.module('AnnuaireMuseeApp').service('AmListMuseeService',
    function ($http, $q) {
        var service = {
            musees: [],
            getListMusee: getListMusee
        };
        return service;
        function getListMusee() {
            var defferer = $q.defer();

            $http.get('http://annuaire-musees-server.dev/musee/').
                success(function (data) {
                    service.musees = data;
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to get List Museum');
                });
            return defferer.promise;
        }
    }
);