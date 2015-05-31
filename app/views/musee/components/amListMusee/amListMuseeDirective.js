angular.module('AnnuaireMuseeApp').directive('amListMusee',
	function (){
		return {
			restrict:"E",
			bindToController : {},
			controller:"AmListMuseeController",
			controllerAs :"amListMusee",
			templateUrl : "app/views/musee/components/amListMusee/amListMusee.html",
			scope : true
		};
	}
);