gameApp.directive("gameObject", function () {
    return {
        templateUrl: "directives/gameObject.html",
        replace: true,
        restrict: 'E',
        scope: {},
        controller: "gameObjectController"
    }
});