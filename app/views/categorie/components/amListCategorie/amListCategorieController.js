angular.module('AnnuaireMuseeApp').controller('AmListCategorieController',
    function (AmListCategorieService, $scope) {

        var ctrlCategorie = this;

        ctrlCategorie.gridOptions = {};

        ctrlCategorie.gridOptions.columnDefs = [
            {name: 'id', enableCellEdit: false},
            {name: 'label', displayName: 'Nom'},
            {name: 'categorieParent', displayName: 'Catégorie Parent'},
        ];
        ctrlCategorie.gridOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            ctrlCategorie.gridApi = gridApi;
            gridApi.rowEdit.on.saveRow($scope, ctrlCategorie.saveRow);
        };

        //Récupération de la liste des catégories
        ctrlCategorie.getListCategorie = function () {
            AmListCategorieService.getListCategorie()
                .then(function (categories) {
                    ctrlCategorie.gridOptions.data = categories;
                    console.log('categories returned to controller.');
                },
                function (data) {
                    console.log('categories retrieval failed.');
                });
        };
        //Enregistrement des modifications d'un musée
        ctrlCategorie.saveRow = function (rowEntity) {
            ctrlCategorie.gridApi.rowEdit.setSavePromise(rowEntity, AmListCategorieService.updateCategorie(rowEntity));
        };

        ctrlCategorie.getListCategorie();
    }
);