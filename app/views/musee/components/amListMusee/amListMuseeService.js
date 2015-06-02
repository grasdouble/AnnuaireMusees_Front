angular.module('AnnuaireMuseeApp').service('AmListMuseeService',
    function ($http, $q) {
        var srvMusee = this;
        var service = {
            musees: [],
            getListMusee: getListMusee,
            updateMusee: updateMusee,
            createMusee: createMusee,
            deleteMusee: deleteMusee
        };
        return service;

        function getListMusee() {
            var defferer = $q.defer();

            $http.get('http://back.annuaire.webizone.fr/musee/full').
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

            $http.put('http://back.annuaire.webizone.fr/musee/', rowUpdate).
                success(function (data) {
                    console.log(data);
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to update Museum');
                });
            return defferer.promise;
        }

        function deleteMusee(rowDelete) {
            var defferer = $q.defer();
            $http.delete('http://back.annuaire.webizone.fr/musee/'+rowDelete).
                success(function (data) {
                    console.log(data);
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to delete Museum');
                });
            return defferer.promise;
        }

        function createMusee(nom, description) {
            var defferer = $q.defer();
            $http.post('http://back.annuaire.webizone.fr/musee/', {nom:nom,description:description}).
                success(function (data) {
                    console.log(data);
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to create Museum');
                });
            return defferer.promise;
        }
    }
);