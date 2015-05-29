angular.module('AnnuaireMuseeApp').directive('menu',
	function (){
		return {
			restrict:"E",
			bindToController : {},
			controller:"MenuController",
			controllerAs :"menu",
			templateUrl : "app/views/home/components/menu/menu.html",
			scope : true
		};
	}
);