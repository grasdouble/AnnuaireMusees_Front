angular.module('AnnuaireMuseeApp').controller('AmListMuseeController',
    function (AmListMuseeService, AmListCategorieService, $scope) {

        var ctrlMusee = this;
        ctrlMusee.listCateg = null;
        ctrlMusee.gridOptions = {};

        //Récupération de la liste des musées
        ctrlMusee.getListMusee = function () {
            AmListMuseeService.getListMusee()
                .then(function (musees) {
                    for (i = 0; i < musees.length; i++) {
                        if (musees[i].categories !== null) {
                            for (j = 0; j < ctrlMusee.listCateg.length; j++) {
                                if (musees[i].categories.label === ctrlMusee.listCateg[j].label) {
                                    musees[i].categories = ctrlMusee.listCateg[j].id;
                                }
                            }
                        }
                    }
                    ctrlMusee.gridOptions.data = musees;
                    console.log('musees returned to controller.');
                },
                function (data) {
                    console.log('musees retrieval failed.');
                });
        };

        //Récupération de la liste des catégories pour la liste déroulante
        var removeTemplate = '<input type="button" value="remove" ng-click="grid.appScope.Delete(row)" />';
        ctrlMusee.getListCategorie = function () {
            AmListCategorieService.getListCategorie()
                .then(function (categories) {
                    ctrlMusee.listCateg = categories;
                    ctrlMusee.gridOptions.columnDefs = [
                        {name: 'id', enableCellEdit: false},
                        {name: 'nom', displayName: 'Nom'},
                        {name: 'description'},
                        {
                            name: 'categories',
                            displayName: 'Categorie',
                            editableCellTemplate: 'ui-grid/dropdownEditor',
                            width: '20%',
                            cellFilter: 'mapCategorie',
                            editDropdownValueLabel: 'label',
                            editDropdownOptionsArray: ctrlMusee.listCateg
                        },
                        {name: 'action', enableCellEdit: false, displayName: "Action", cellTemplate: removeTemplate}
                    ];
                    console.log('categories returned to controller.');
                },
                function (data) {
                    console.log('categories retrieval failed.');
                });
        };

        //Création d'un musée
        $scope.createMusee = function (nom, description) {
            AmListMuseeService.createMusee(nom, description).then(function (retour) {
                $scope.modalShown = false;
                ctrlMusee.getListMusee();
            }, function (data) {
                console.log('museum retrieval failed.');
            });

        };

        //Enregistrement des modifications d'un musée
        ctrlMusee.gridOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            ctrlMusee.gridApi = gridApi;
            gridApi.rowEdit.on.saveRow($scope, ctrlMusee.saveRow);
        };
        ctrlMusee.saveRow = function (rowEntity) {
            ctrlMusee.gridApi.rowEdit.setSavePromise(rowEntity, AmListMuseeService.updateMusee(rowEntity));
        };

        //Suppression d'un musée
        $scope.Delete = function (row) {
            var index = ctrlMusee.gridOptions.data.indexOf(row.entity);
            AmListMuseeService.deleteMusee(row.entity.id).then(function (musees) {
                ctrlMusee.gridOptions.data.splice(index, 1);
            });
        };

        //Chargement des données
        ctrlMusee.getListCategorie();
        ctrlMusee.getListMusee();

        //Gestion de l'affichage de la fenetre modale
        $scope.modalShown = false;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };

    }
).filter("mapCategorie", function (AmListCategorieService) {
        //Mise en place d'un filter pour la liste déroulante  'categorie'
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
        //Si les données de la liste n'ont pas déjà été chargées, on le fait sinon on fait appel au
        // filter (realFilter) pour peupler la liste déroulante
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
