gameApp.controller('MenuController',
    function ($scope, $http) {
       $http.get("?controller=menu")
           .then(function success(response) {
               $scope.items = response.data;
           })
    });