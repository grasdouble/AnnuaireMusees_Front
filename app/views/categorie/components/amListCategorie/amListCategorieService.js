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

        //Récupération de la liste des catégories
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

        //Création d'une catégorie
        function createCategorie(label) {
            var defferer = $q.defer();
            $http.post('http://back.annuaire.webizone.fr/categorie/', {label: label}).
                success(function (data) {
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to create Categorie');
                });
            return defferer.promise;
        }

        //Update d'une catégorie
        function updateCategorie(rowUpdate) {
            var defferer = $q.defer();

            $http.put('http://back.annuaire.webizone.fr/categorie/', rowUpdate).
                success(function (data) {
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to update Category');
                });
            return defferer.promise;
        }

        //Suppression d'une catégorie
        function deleteCategorie(rowDelete) {
            var defferer = $q.defer();

            $http.delete('http://back.annuaire.webizone.fr/categorie/' + rowDelete).
                success(function (data) {
                    defferer.resolve(data);
                }).
                error(function () {
                    defferer.reject('Failed to delete Categorie');
                });
            return defferer.promise;
        }


    }
);