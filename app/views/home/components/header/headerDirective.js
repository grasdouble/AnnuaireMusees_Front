angular.module('AnnuaireMuseeApp').directive('header',
	function (){
		return {
			restrict:"E",
			bindToController : {},
			controller:"HeaderController",
			controllerAs :"header",
			templateUrl : "app/views/home/components/header/header.html",
			scope : true
		};
	}
);