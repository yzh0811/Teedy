'use strict';

/**
 * Registration requests controller.
 */
angular.module('docs').controller('SettingsRegistration', function($scope, Restangular, $translate, $dialog) {
    // Load registration requests
    $scope.loadRequests = function() {
        Restangular.one('user/register/list').get().then(function(response) {
            $scope.requests = response.requests;
        }, function() {
            var title = $translate.instant('registration.requests.error.load');
            var msg = $translate.instant('registration.requests.error.load');
            var btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
            $dialog.messageBox(title, msg, btns);
        });
    };

    // Process a registration request
    $scope.processRequest = function(id, action) {
        Restangular.one('user/register/' + id).post('', {
            action: action
        }).then(function() {
            var title = $translate.instant('registration.requests.success.' + action);
            var msg = $translate.instant('registration.requests.success.' + action);
            var btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
            $dialog.messageBox(title, msg, btns).then(function() {
                $scope.loadRequests();
            });
        }, function(response) {
            var title = $translate.instant('registration.requests.error.process');
            var msg = response.data.message || $translate.instant('registration.requests.error.process');
            var btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
            $dialog.messageBox(title, msg, btns);
        });
    };

    // Load requests on page load
    $scope.loadRequests();
}); 