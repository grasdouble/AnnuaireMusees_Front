angular.module('AnnuaireMuseeApp').controller('AmListMuseeController',
    function (AmListMuseeService) {

        var vm = this;

        vm.gridOptions = {
        };

        vm.gridOptions.columnDefs = [
            {name:'id'},
            {name:'name',field:'nom'},
            {name:'description'}, // showing backwards compatibility with 2.x.  you can use field in place of name
            {name: 'categories'}
        ];




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

        vm.getListMusee();
    }
);