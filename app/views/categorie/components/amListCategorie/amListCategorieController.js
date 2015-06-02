angular.module('AnnuaireMuseeApp').controller('AmListCategorieController',
    function (AmListCategorieService, $scope) {

        var ctrlCategorie = this;
        ctrlCategorie.listCateg = null;
        ctrlCategorie.gridOptions = {};


        ctrlCategorie.gridOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            ctrlCategorie.gridApi = gridApi;
            gridApi.rowEdit.on.saveRow($scope, ctrlCategorie.saveRow);
        };

        //Récupération de la liste des catégories

        ctrlCategorie.getListCategorie = function () {
            AmListCategorieService.getListCategorie()
                .then(function (categories) {
                    for (i = 0; i < categories.length; i++) {

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
                        {name:'action', enableCellEdit: false,displayName: "Action", cellTemplate: removeTemplate}
                    ];
                    console.log('categories returned to controller.');
                    ctrlCategorie.getListCategorie();
                },
                function (data) {
                    console.log('categories retrieval failed.');
                });
        };

        $scope.Delete = function(row) {
            var index = ctrlCategorie.gridOptions.data.indexOf(row.entity);
            AmListCategorieService.deleteCategorie(row.entity.id).then(function (categories) {
                ctrlCategorie.gridOptions.data.splice(index, 1);
                ctrlCategorie.getListCategorieParent();
                ctrlCategorie.getListCategorie();
            });
        };

        //Enregistrement des modifications d'un musée
        ctrlCategorie.saveRow = function (rowEntity) {
            ctrlCategorie.gridApi.rowEdit.setSavePromise(rowEntity, AmListCategorieService.updateCategorie(rowEntity));
            ctrlCategorie.getListCategorieParent();
            ctrlCategorie.getListCategorie();
        };

        ctrlCategorie.getListCategorieParent();


        $scope.modalShown = false;
        $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
        };

        $scope.createCategorie = function(label){
            AmListCategorieService.createCategorie(label).then(function (retour) {
                $scope.modalShown = false;
                ctrlCategorie.getListCategorieParent();
                ctrlCategorie.getListCategorie();
            },function (data) {
                console.log('categorie insert failed.');
            });

        };
    }
).filter("mapCategorie", function (AmListCategorieService) {
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

angular.module('AnnuaireMuseeApp').directive('modal2', function () {
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