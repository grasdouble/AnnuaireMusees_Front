angular.module('AnnuaireMuseeApp').service('AmListCategorieService',
    function ($http, $q) {
        var srvCategorie = this;
        var service = {
            categories: [],
            getListCategorie: getListCategorie,
            updateCategorie: updateCategorie,
            createCategorie: createCategorie,
            deleteCategorie: deleteCategorie
        };
        return service;

        function getListCategorie() {
            var defferer = $q.defer();

            $http.get('http://back.annuaire.webizone.fr/categorie/').
                success(function (data) {
                    service.categories = data;
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to get List Category');
                });
            return defferer.promise;
        }

        function updateCategorie(rowUpdate) {
            var defferer = $q.defer();

            $http.put('http://back.annuaire.webizone.fr/categorie/', rowUpdate).
                success(function (data) {
                    console.log(data);
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to update Category');
                });
            return defferer.promise;
        }

        function deleteCategorie(rowDelete) {
            var defferer = $q.defer();

            $http.delete('http://back.annuaire.webizone.fr/categorie/'+rowDelete).
                success(function (data) {
                    console.log(data);
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to delete Categorie');
                });
            return defferer.promise;
        }

        function createCategorie(label) {
            var defferer = $q.defer();
            console.log(label);
            $http.post('http://back.annuaire.webizone.fr/categorie/', {label:label}).
                success(function (data) {
                    console.log(data);
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to create Categorie');
                });
            return defferer.promise;
        }
    }
);