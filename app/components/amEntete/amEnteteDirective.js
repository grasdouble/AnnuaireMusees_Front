angular.module('AnnuaireMuseeApp').directive('amEntete',
	function (){
		return {
			restrict:"E",
			bindToController : {},
			controller:"AmEnteteController",
			controllerAs :"amEntete",
			templateUrl : "app/components/amEntete/amEntete.html",
			scope : true
		};
	}
);