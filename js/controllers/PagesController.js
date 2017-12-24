gameApp.controller("PagesController",
    function ($scope, $http) {
        $http.get("?controller=user")
            .then(function success(response) {
                $scope.users = response.data;
            })
    });
