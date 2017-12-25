"use strict";

var app = angular.module("gameApp", ["ngRoute", "ngResource"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/:name', {
            templateUrl: function (page) {
                return "assets/" + page.name + ".html";
            },
            controller: 'UsersController'
        })
        .otherwise('/start');
})

    .controller('MenuController', function ($scope, $http) {
        $http.get("?controller=menu")
            .then(function success(response) {
                $scope.items = response.data;
            })
    })

    .controller("UsersController", function ($scope, $http) {
        $http.get("?controller=user")
            .then(function success(response) {
                $scope.users = response.data;
            })
    })

    .controller("GameController", function ($scope, $rootScope, $location, $http) {
        $rootScope.level = 1;
        $scope.score = 0;
        $scope.count = 0;

        $rootScope.$on("killed", function () {
            $scope.score += $rootScope.power;
            // $scope.time += 5;
            $scope.count++;
            if ($scope.count === 5) {
                $rootScope.level++;
                if ($rootScope.level === 3)
                    $rootScope.$emit('endGame');
                $scope.count = 0;
            }
        });

        // $rootScope.$on("missed", function () {
        //     $scope.time -= 5;
        // });

        $rootScope.$on("end", function () {
            $rootScope.totalScore = $scope.score;
            $rootScope.$emit('endGame');
            $location.path('/gameover');
        });

        $scope.sendResult = function () {
            $http.post("?controller=user",
                {
                    id: 0, name: $scope.inputform.username.$modelValue,
                    score: $rootScope.totalScore
                })
                .then(function success() {
                    $location.path('/top');
                })
        }
    })

    .controller("GameObjectController",
        function ($scope, $rootScope, $http, $timeout, $interval) {
            var object;

            $http.get("?controller=object")
                .then(function success(response) {
                    object = response.data;
                    $scope.addObject();
                });

            $scope.x = 0;
            $scope.y = Math.floor(Math.random() * 101);
            var isOver = false;
            var time = 0;
            var timer;
            var animation;

            $scope.addObject = function () {
                if ($rootScope.level <= 3) {
                    $rootScope.power = object[$rootScope.level - 1].power;
                    $scope.speed = object[$rootScope.level - 1].speed;
                    $scope.image = object[$rootScope.level - 1].image;
                    $scope.status = "visible";
                    $scope.move();
                } else {
                    $rootScope.$emit('endGame');
                }
            };

            $scope.move = function () {
                animation = $interval(function () {
                    time += $scope.speed / 40;
                    $scope.x = Math.round(Math.random() * 360) - (Math.round(Math.random() * 90) - 45);
                    $scope.y = Math.sin(Math.random());
                }, 10);

                timer = $timeout(function () {
                    $scope.miss();
                }, 10000)
            };

            $scope.kill = function () {
                $rootScope.$emit("killed");
                $timeout.cancel(timer);
                $scope.stop();
            };

            $scope.miss = function () {
                $rootScope.$emit("missed");
                $interval.cancel(animation);
                $scope.stop();
            };

            $scope.stop = function () {
                $scope.status = "hidden";
                $interval.cancel(animation);
                time = 0;
                $scope.x = 0;
                $scope.y = Math.floor(Math.random() * 101);

                if (!isOver)
                    $scope.addObject();
            };

            $rootScope.$on('endGame', function () {
                isOver = true;
                $interval.cancel(animation);

                $scope.$on('$destroy', function () {
                    $interval.cancel(animation);
                    animation = undefined;
                });
            });
        })

    .directive("menulist", function () {
        return {
            templateUrl: "directives/menu.html",
            replace: true,
            restrict: 'E',
            scope: {},
            controller: "MenuController"
        }
    })

    .directive("object", function () {
        return {
            templateUrl: "directives/object.html",
            replace: true,
            restrict: 'E',
            scope: {},
            controller: "GameObjectController"
        }
    });