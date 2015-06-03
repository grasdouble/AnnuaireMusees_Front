angular.module('AnnuaireMuseeApp').service('AmListMuseeService',
    function ($http, $q,urls) {
        var srvMusee = this;
        var service = {
            musees: [],
            getListMusee: getListMusee,
            updateMusee: updateMusee,
            createMusee: createMusee,
            deleteMusee: deleteMusee
        };
        return service;

        //Récupération de la liste des musée
        function getListMusee() {
            var defferer = $q.defer();
            $http.get('http://'+urls.environnement+'/musee/full').
                success(function (data) {
                    service.musees = data;
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to get List Museum');
                });
            return defferer.promise;
        }

        //Création d'un musée
        function createMusee(nom, description) {
            var defferer = $q.defer();
            $http.post('http://'+urls.environnement+'/musee/', {nom: nom, description: description}).
                success(function (data) {
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to create Museum');
                });
            return defferer.promise;
        }

        //Update d'un musée
        function updateMusee(rowUpdate) {
            var defferer = $q.defer();
            $http.put('http://'+urls.environnement+'/musee/', rowUpdate).
                success(function (data) {
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to update Museum');
                });
            return defferer.promise;
        }

        //Suppression d'un musée
        function deleteMusee(rowDelete) {
            var defferer = $q.defer();
            $http.delete('http://'+urls.environnement+'/musee/' + rowDelete).
                success(function (data) {
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to delete Museum');
                });
            return defferer.promise;
        }
    }
);