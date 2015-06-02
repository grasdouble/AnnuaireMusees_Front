angular.module('AnnuaireMuseeApp').
    value('duScrollDuration', 500).
    value('duScrollOffset', 60).
    controller('AmMenuController',
    function ($scope) {
        var _this = this;
        var positionY = -1;
        this.menuFixed = false;
        var onScroll = function onScroll() {
            positionY = window.scrollY;
            if (positionY > 460) {
                if (_this.menuFixed === false) {
                    _this.menuFixed = true;
                    $scope.$digest();
                }
            }
            else {
                if (_this.menuFixed === true) {
                    _this.menuFixed = false;
                    $scope.$digest();
                }
            }
        };
        window.addEventListener("scroll", onScroll);
    }
);