gameApp.controller("GameObjectController",
    function ($scope, $rootScope, $http, $timeout, $interval) {
        var object;
        $http.get("?controller=object")
            .then(function onSuccess(response) {
                object = response.data
                $scope.got();
            })

        var index = 0;
        $scope.x = Math.random();
        $scope.y = Math.random();
        $scope.power = 0;
        $scope.speed = 1;
        var isOver = false;
        var time = 0;
        var timer;
        var animation;

        $scope.kill = function () {
            $rootScope.$emit("killed");
            $timeout.cancel(timer);
            $scope.stop();
        };

        $scope.miss = function () {
            $rootScope.$emit("missed");
            $scope.stop();
        };

        $scope.stop = function () {
            $scope.status = "hidden";
            $interval.cancel(animation);
            time = 0;
            //
        };

        $rootScope.$on('endGame', function () {
            isOver = true;
        })
    });