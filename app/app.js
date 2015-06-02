/**
 * @ngdoc overview
 * @name AnnuaireMuseeApp
 * @description
 * # AnnuaireMuseeApp
 *
 * Main module of the application.
 */
angular
    .module('AnnuaireMuseeApp', [
        'ngAnimate',
        'ngRoute',
        'ngTouch',
        'duScroll',
        'ui.bootstrap',
        'ui.grid',
        'ui.grid.edit',
        'ui.grid.rowEdit',
        'ui.grid.cellNav'

    ]);

angular.module('AnnuaireMuseeApp').directive('modal', function () {
    return {
        restrict: 'E',
        scope: {
            show: '=info'
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function(scope, element, attrs) {
            scope.dialogStyle = {};
            if (attrs.width){
                scope.dialogStyle.width = attrs.width;
            }
            if (attrs.height){
                scope.dialogStyle.height = attrs.height;
            }
            scope.hideModal = function() {
                scope.show = false;
            };
        },
        template: "<div class='modal-header' ng-show='show'>" +
        "<div class='ng-modal-overlay' ng-click='hideModal()'></div>" +
        "<div class='ng-modal-dialog' ng-style='dialogStyle'>" +
        "<div class='ng-modal-close' ng-click='hideModal()'>X</div>" +
        "<div class='ng-modal-dialog-content' ng-transclude></div>" +
        "</div></div>"
    };
});