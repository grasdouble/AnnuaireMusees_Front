angular.module('AnnuaireMuseeApp').directive('amEditMusee',
	function (){
		return {
			restrict:"E",
			bindToController : {},
			controller:"AmEditMuseeController",
			controllerAs :"amEditMusee",
			templateUrl : "app/views/musee/components/amEditMusee/amEditMusee.html",
			scope : true
		};
	}
);