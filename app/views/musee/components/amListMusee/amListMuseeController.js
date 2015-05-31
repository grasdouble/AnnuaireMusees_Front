angular.module('AnnuaireMuseeApp').controller('AmListMuseeController',
    function (AmListMuseeService, AmListCategorieService, $scope) {

        var ctrlMusee = this;
        ctrlMusee.listCateg = null;

        ctrlMusee.gridOptions = {};


        ctrlMusee.gridOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            ctrlMusee.gridApi = gridApi;
            gridApi.rowEdit.on.saveRow($scope, ctrlMusee.saveRow);
        };


        //Récupération de la liste des musées
        ctrlMusee.getListMusee = function () {
            AmListMuseeService.getListMusee()
                .then(function (musees) {
                    for (i = 0; i < musees.length; i++) {
                        if (musees[i].categories[0] !== undefined) {

                            for (j = 0; j < ctrlMusee.listCateg.length; j++) {
                                if (musees[i].categories[0].label === ctrlMusee.listCateg[j].label) {
                                    musees[i].categories = ctrlMusee.listCateg[j].id;
                                }
                            }

                            //musees[i].categories = ctrlMusee.listCateg[ctrlMusee.listCateg.indexOf(musees[i].categories[0])].id ;
                            //ctrlMusee.listCateg.indexOf(musees[i].categories[0]);
                            //musees[i].categories = musees[i].categories[0].label === 'categ 1' ? 1 : 2;
                        }
                    }
                    ctrlMusee.gridOptions.data = musees;
                    console.log('musees returned to controller.');
                },
                function (data) {
                    console.log('musees retrieval failed.');
                });
        };

        //Récupération de la liste des catégories
        ctrlMusee.getListCategorie = function () {
            AmListCategorieService.getListCategorie()
                .then(function (categories) {
                    ctrlMusee.listCateg = categories;
                    ctrlMusee.gridOptions.columnDefs = [
                        {name: 'id', enableCellEdit: false},
                        {name: 'nom', displayName: 'Nom'},
                        {name: 'description'}, // showing backwards compatibility with 2.x.  you can use field in place of name
                        {
                            name: 'categories',
                            displayName: 'Categorie',
                            editableCellTemplate: 'ui-grid/dropdownEditor',
                            width: '20%',
                            cellFilter: 'mapCategorie',
                            editDropdownValueLabel: 'label',
                            editDropdownOptionsArray: ctrlMusee.listCateg
                        }
                    ];
                    console.log('categories returned to controller.');
                },
                function (data) {
                    console.log('categories retrieval failed.');
                });
        };

        //Enregistrement des modifications d'un musée
        ctrlMusee.saveRow = function (rowEntity) {
            ctrlMusee.gridApi.rowEdit.setSavePromise(rowEntity, AmListMuseeService.updateMusee(rowEntity));
        };

        ctrlMusee.getListCategorie();
        ctrlMusee.getListMusee();

    }
).filter("mapCategorie", function (AmListCategorieService) {
        var data = null, serviceInvoked = false;

        function realFilter(value) {
            var retour = '';
            if (!value) {
                return retour;
            } else {
                for (j = 0; j < data.length; j++) {
                    if (value === data[j].id) {
                        retour = data[j].label;
                    }
                }
                return retour;
            }
        }

        filterStub.$stateful = true;
        function filterStub(value) {
            if (data === null) {
                if (!serviceInvoked) {

                    serviceInvoked = true;
                    AmListCategorieService.getListCategorie()
                        .then(function (categories) {
                            data = categories;

                        },
                        function (data) {
                            console.log('categories retrieval failed.');
                        });
                }
                return "-";
            }
            else {
                return realFilter(value);
            }
        }

        return filterStub;
    });
