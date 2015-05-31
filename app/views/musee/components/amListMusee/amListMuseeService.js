angular.module('AnnuaireMuseeApp').service('AmListMuseeService',
    function ($http, $q) {
        var srvMusee = this;
        var service = {
            musees: [],
            getListMusee: getListMusee,
            updateMusee: updateMusee
        };
        return service;

        function getListMusee() {
            var defferer = $q.defer();

            $http.get('http://annuaire-musees-server.dev/musee/full').
                success(function (data) {
                    service.musees = data;
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to get List Museum');
                });
            return defferer.promise;
        }

        function updateMusee(rowUpdate) {
            var defferer = $q.defer();

            $http.put('http://annuaire-musees-server.dev/musee/', rowUpdate).
                success(function (data) {
                    console.log(data);
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to update Museum');
                });
            return defferer.promise;
        }
    }
);