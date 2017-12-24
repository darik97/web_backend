gameApp.controller("GameController",
    function ($scope, $rootScope, $location, $http) {
        $scope.level = 1;
        $scope.score = 0;
        $scope.time = 30;
        $scope.count = 0;

        $rootScope.$on("killed", function () {
            $scope.score += $scope.level * 5;
            $scope.time += 5;
            $scope.count++;
            if ($scope.count === 5) {
                $scope.level++;
                $scope.count = 0;
                $rootScope.$emit('newLevel');
            }
        });

        $rootScope.$on("missed", function () {
            $scope.time -= 5;
        });

        $rootScope.$on("end", function () {
            $rootScope.totalScore = $scope.score;
            $rootScope.$emit('endGame');
            $location.path('/gameover');
        });

        $scope.sendResult = function () {
            $http.post("?controller=user",
                {id:0, name: $scope.inputform.username.$modelValue,
                    score: $rootScope.totalScore})
                .then(function onSuccess() {
                    $location.path('/top');
                })
        }
    });