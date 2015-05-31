angular.module('AnnuaireMuseeApp').service('AmListCategorieService',
    function ($http, $q) {
        var srvCategorie = this;
        var service = {
            categories: [],
            categoriesLite: [],
            getListCategorie: getListCategorie,
            getListCategorieLite: getListCategorieLite,
            updateCategorie: updateCategorie
        };
        return service;

        function getListCategorie() {
            var defferer = $q.defer();

            $http.get('http://annuaire-musees-server.dev/categorie/').
                success(function (data) {
                    service.categories = data;
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to get List Category');
                });
            return defferer.promise;
        }

        function getListCategorieLite() {
            var defferer = $q.defer();

            $http.get('http://annuaire-musees-server.dev/categorie/lite').
                success(function (data) {
                    service.categoriesLite = data;
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to get List Category Lite');
                });
            return defferer.promise;
        }

        function updateCategorie(rowUpdate) {
            var defferer = $q.defer();

            $http.put('http://annuaire-musees-server.dev/categorie/', rowUpdate).
                success(function (data) {
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to update Category');
                });
            return defferer.promise;
        }
    }
);