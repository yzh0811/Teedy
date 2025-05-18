angular.module('docs').controller('RegistrationRequestsController', ['$scope', '$http', 'notificationService',
    function($scope, $http, notificationService) {
        // Load registration requests
        $scope.loadRequests = function() {
            $http.get('api/user/register/list').then(function(response) {
                $scope.requests = response.data.requests;
            }, function() {
                notificationService.error('registration.requests.error.load');
            });
        };

        // Process a registration request
        $scope.processRequest = function(id, action) {
            $http.post('api/user/register/' + id, {
                action: action
            }).then(function() {
                notificationService.success('registration.requests.success.' + action);
                $scope.loadRequests();
            }, function(response) {
                if (response.data.type === 'RequestNotFound') {
                    notificationService.error('registration.requests.error.not_found');
                } else {
                    notificationService.error('registration.requests.error.process');
                }
            });
        };

        // Load requests on page load
        $scope.loadRequests();
    }
]); 