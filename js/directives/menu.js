gameApp.directive("menu", function () {
    return {
        templateUrl: "../../directives/menu.html",
        replace: true,
        restrict: 'E',
        scope: {},
        controller: "MenuController"
    }
});