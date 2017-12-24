"use strict";

var app = angular.module("gameApp", ["ngRoute", "ngResource"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/:name', {
            templateUrl: function (page) {
                return "assets/" + page.name + ".html";
            },
            controller: 'PagesController'
        })
        .otherwise('/start');
})

    .controller('MenuController',
        function ($scope, $http) {
            $http.get("?controller=menu")
            // .success(function (data) {
            //     $scope.items = data;
            // })
                .then(function success(response) {
                    $scope.items = response.data;
                })
        })

    .controller("PagesController",
        function ($scope, $http) {
            $http.get("?controller=user")
                .then(function success(response) {
                    $scope.users = response.data;
                })
        })

    .controller("GameController",
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
                    {
                        id: 0, name: $scope.inputform.username.$modelValue,
                        score: $rootScope.totalScore
                    })
                    .then(function onSuccess() {
                        $location.path('/top');
                    })
            }
        })

    .controller("GameObjectController",
        function ($scope, $rootScope, $http, $timeout, $interval) {
            var object;
            $http.get("?controller=object")
                .then(function success(response) {
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

    .directive("gameObject", function () {
        return {
            templateUrl: "directives/gameObject.html",
            replace: true,
            restrict: 'E',
            scope: {},
            controller: "gameObjectController"
        }
    });