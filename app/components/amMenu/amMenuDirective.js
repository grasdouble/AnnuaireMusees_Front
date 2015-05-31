angular.module('AnnuaireMuseeApp').directive('amMenu',
	function (){
		return {
			restrict:"E",
			bindToController : {},
			controller:"AmMenuController",
			controllerAs :"amMenu",
			templateUrl : "app/components/amMenu/amMenu.html",
			scope : true
		};
	}
);