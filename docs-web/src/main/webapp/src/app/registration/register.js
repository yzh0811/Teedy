angular.module('docs').controller('RegisterController', ['$scope', '$http', '$location', 'notificationService',
    function($scope, $http, $location, notificationService) {
        $scope.register = function() {
            $http.post('api/user/register', {
                username: $scope.username,
                password: $scope.password,
                email: $scope.email
            }).then(function() {
                notificationService.success('registration.success');
                $location.path('/login');
            }, function(response) {
                if (response.data.type === 'AlreadyExistingUsername') {
                    notificationService.error('registration.error.username.exists');
                } else {
                    notificationService.error('registration.error');
                }
            });
        };
    }
]); 