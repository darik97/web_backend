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
});