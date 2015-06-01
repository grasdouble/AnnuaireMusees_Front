angular.module('AnnuaireMuseeApp').directive('amEditCategotie',
    function () {
        return {
            restrict: "E",
            bindToController: {},
            controller: "AmEditCategotieController",
            controllerAs: "amEditCategotie",
            templateUrl: "app/views/categorie/components/amEditCategotie/amEditCategotie.html",
            scope: true
        };
    }
);