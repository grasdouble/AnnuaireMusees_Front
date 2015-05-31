angular.module('AnnuaireMuseeApp').directive('amListCategorie',
	function (){
		return {
			restrict:"E",
			bindToController : {},
			controller:"AmListCategorieController",
			controllerAs :"amListCategorie",
			templateUrl : "app/views/musee/components/amListCategorie/amListCategorie.html",
			scope : true
		};
	}
);