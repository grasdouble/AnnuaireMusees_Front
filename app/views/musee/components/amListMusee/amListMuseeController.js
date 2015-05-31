angular.module('AnnuaireMuseeApp').controller('AmListMuseeController',
    function (AmListMuseeService) {

        var vm = this;
        vm.listMusee = [
            {"id":"1","nom":"Mus\u00e9e 1","description":"description mus\u00e9e 1","categories":[]},
            {"id":"2","nom":"Mus\u00e9e 2","description":"description mus\u00e9e 2","categories":[]},
            {"id":"3","nom":"testAddMusee2","description":"testAddMusee","categories":[]},
            {"id":"4","nom":"testAddMusee2","description":"testAddMuseeAAA","categories":[]}];

        vm.gridOptions = {
        };

        vm.gridOptions.columnDefs = [
            {name:'id'},
            {name:'name',field:'nom'},
            {name:'description'}, // showing backwards compatibility with 2.x.  you can use field in place of name
            {name: 'categories'}
        ];
        vm.gridOptions.data = vm.listMusee;



        vm.getListMusee = function () {
            AmListMuseeService.getListMusee()
                .then(function(musees) {
                    vm.listMusee = musees;
                    console.log('musees returned to controller.');
                },
                function(data) {
                    console.log('musees retrieval failed.');
                });
        };

        //vm.getListMusee();
    }
);