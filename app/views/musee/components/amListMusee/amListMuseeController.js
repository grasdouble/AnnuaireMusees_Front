angular.module('AnnuaireMuseeApp').controller('AmListMuseeController',
    function (AmListMuseeService,$scope,$q,$interval) {

        var vm = this;

        vm.gridOptions = {
        };
        vm.gridOptions.appScopeProvider=vm;
        vm.gridOptions.columnDefs = [
            {name:'id', enableCellEdit: false},
            {name:'nom', displayName: 'Nom'},
            {name:'description'}, // showing backwards compatibility with 2.x.  you can use field in place of name
            {name: 'categories',enableCellEdit: false}
        ];

        vm.gridOptions.onRegisterApi = function(gridApi){
            //set gridApi on scope
            vm.gridApi = gridApi;
            gridApi.rowEdit.on.saveRow($scope, vm.saveRow);
        };




        vm.getListMusee = function () {
            AmListMuseeService.getListMusee()
                .then(function(musees) {
                    vm.gridOptions.data = musees;
                    console.log('musees returned to controller.');
                },
                function(data) {
                    console.log('musees retrieval failed.');
                });
        };

        vm.saveRow = function( rowEntity ) {
            vm.gridApi.rowEdit.setSavePromise( rowEntity, AmListMuseeService.updateMusee(rowEntity) );
        };

        vm.getListMusee();
    }
);