angular.module('AnnuaireMuseeApp').controller('AmListCategorieController',
    function (AmListCategorieService, $scope) {

        var ctrlCategorie = this;
        ctrlCategorie.listCateg = null;
        ctrlCategorie.gridOptions = {};


        //Récupération de la liste des catégories
        ctrlCategorie.getListCategorie = function () {
            AmListCategorieService.getListCategorie()
                .then(function (categories) {
                    for (i = 0; i < categories.length; i++) {
                        //Récupération de la catégorie parent
                        if (categories[i].categorieParent !== null) {
                            for (j = 0; j < ctrlCategorie.listCateg.length; j++) {
                                if (categories[i].categorieParent === ctrlCategorie.listCateg[j].label) {
                                    categories[i].categorieParent = ctrlCategorie.listCateg[j].id;
                                }
                            }
                        }
                    }
                    ctrlCategorie.gridOptions.data = categories;
                    console.log('categories returned to controller.');
                },
                function (data) {
                    console.log('categories retrieval failed.');
                });
        };
        //Récupération de la liste des catégorie
        var removeTemplate = '<input type="button" value="remove" ng-click="grid.appScope.Delete(row)" />';
        ctrlCategorie.getListCategorieParent = function () {
            AmListCategorieService.getListCategorie()
                .then(function (categories) {
                    ctrlCategorie.listCateg = categories;
                    ctrlCategorie.gridOptions.columnDefs = [
                        {name: 'id', enableCellEdit: false},
                        {name: 'label', displayName: 'Nom'},
                        {
                            name: 'categorieParent',
                            displayName: 'Catégorie Parent',
                            editableCellTemplate: 'ui-grid/dropdownEditor',
                            width: '20%',
                            cellFilter: 'mapCategorie',
                            editDropdownValueLabel: 'label',
                            editDropdownOptionsArray: ctrlCategorie.listCateg
                        },
                        {name: 'action', enableCellEdit: false, displayName: "Action", cellTemplate: removeTemplate}
                    ];
                    console.log('categories returned to controller.');
                    ctrlCategorie.getListCategorie();
                },
                function (data) {
                    console.log('categories retrieval failed.');
                });
        };

        //Enregistrement d'une nouvelle catégorie
        $scope.createCategorie = function (label) {
            AmListCategorieService.createCategorie(label).then(function (retour) {
                $scope.modalShown = false;
                ctrlCategorie.getListCategorieParent();
                ctrlCategorie.getListCategorie();
            }, function (data) {
                console.log('categorie insert failed.');
            });

        };

        //Enregistrement des modifications d'un musée
        ctrlCategorie.gridOptions.onRegisterApi = function (gridApi) {
            ctrlCategorie.gridApi = gridApi;
            gridApi.rowEdit.on.saveRow($scope, ctrlCategorie.saveRow);
        };
        ctrlCategorie.saveRow = function (rowEntity) {
            ctrlCategorie.gridApi.rowEdit.setSavePromise(rowEntity, AmListCategorieService.updateCategorie(rowEntity));
            ctrlCategorie.getListCategorieParent();
            ctrlCategorie.getListCategorie();
        };

        //Suppression de catégorie
        $scope.Delete = function (row) {
            var index = ctrlCategorie.gridOptions.data.indexOf(row.entity);
            AmListCategorieService.deleteCategorie(row.entity.id).then(function (categories) {
                ctrlCategorie.gridOptions.data.splice(index, 1);
                ctrlCategorie.getListCategorieParent();
                ctrlCategorie.getListCategorie();
            });
        };

        ctrlCategorie.getListCategorieParent();

        //Gestion de la fenetre modale
        $scope.modalShown = false;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };

    }
).filter("mapCategorie", function (AmListCategorieService) {
        //Mise en place d'un filter pour la liste déroulante  'categorieParent'
        serviceInvoked = false;
        function realFilter(value) {
            var retour = '';
            if (!value) {
                return retour;
            } else {
                for (j = 0; j < ctrlCategorie.listCateg.length; j++) {
                    if (value === ctrlCategorie.listCateg[j].id) {
                        retour = ctrlCategorie.listCateg[j].label;
                    }
                }
                return retour;
            }
        }

        //Si les données de la liste n'ont pas déjà été chargées, on le fait sinon on fait appel au
        // filter (realFilter) pour peupler la liste déroulante
        filterStub.$stateful = true;
        function filterStub(value) {
            if (ctrlCategorie.listCateg === null) {
                if (!serviceInvoked) {

                    serviceInvoked = true;
                    AmListCategorieService.getListCategorieParent()
                        .then(function (categories) {
                            ctrlCategorie.listCateg = categories;

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

