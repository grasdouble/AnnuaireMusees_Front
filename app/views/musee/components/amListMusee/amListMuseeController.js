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
        var removeTemplate = '<input type="button" value="remove" ng-click="grid.appScope.Delete(row)" />';
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
                        },
                        {name:'action', enableCellEdit: false,displayName: "Action", cellTemplate: removeTemplate}
                    ];
                    console.log('categories returned to controller.');
                },
                function (data) {
                    console.log('categories retrieval failed.');
                });
        };
        $scope.Delete = function(row) {

            var index = ctrlMusee.gridOptions.data.indexOf(row.entity);
            AmListMuseeService.deleteMusee(row.entity.id).then(function (musees) {
                ctrlMusee.gridOptions.data.splice(index, 1);
            });


        };

        //Enregistrement des modifications d'un musée
        ctrlMusee.saveRow = function (rowEntity) {
            ctrlMusee.gridApi.rowEdit.setSavePromise(rowEntity, AmListMuseeService.updateMusee(rowEntity));
        };



        ctrlMusee.getListCategorie();
        ctrlMusee.getListMusee();


        $scope.modalShown = false;
        $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
        };

        $scope.createMusee = function(nom, description){
            AmListMuseeService.createMusee(nom,description).then(function (retour) {
                $scope.modalShown = false;
                ctrlMusee.getListMusee();
            },function (data) {
                console.log('categories retrieval failed.');
            });

        };
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

angular.module('AnnuaireMuseeApp').directive('modal', function () {
        return {
            restrict: 'E',
            scope: {
                show: '=info'
            },
            replace: true, // Replace with the template below
            transclude: true, // we want to insert custom content inside the directive
            link: function(scope, element, attrs) {
                scope.dialogStyle = {};
                if (attrs.width){
                    scope.dialogStyle.width = attrs.width;
                }
                if (attrs.height){
                    scope.dialogStyle.height = attrs.height;
                }
                scope.hideModal = function() {
                    scope.show = false;
                };
            },
            template: "<div class='modal-header' ng-show='show'>" +
            "<div class='ng-modal-overlay' ng-click='hideModal()'></div>" +
            "<div class='ng-modal-dialog' ng-style='dialogStyle'>" +
                "<div class='ng-modal-close' ng-click='hideModal()'>X</div>" +
                "<div class='ng-modal-dialog-content' ng-transclude></div>" +
            "</div></div>"
        };
    });