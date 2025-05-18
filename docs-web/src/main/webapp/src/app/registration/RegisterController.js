'use strict';

/**
 * Registration controller.
 */
angular.module('docs').controller('RegisterController', function($scope, $state, Restangular, $translate, $dialog) {
    $scope.register = function() {
        Restangular.one('user').post('register', {
            username: $scope.username,
            password: $scope.password,
            email: $scope.email
        }).then(function() {
            var title = $translate.instant('registration.success.title');
            var msg = $translate.instant('registration.success.message');
            var btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
            $dialog.messageBox(title, msg, btns).then(function() {
                $state.go('login');
            });
        }, function(data) {
            var title = $translate.instant('registration.error.title');
            var msg = $translate.instant('registration.error.message');
            var btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
            $dialog.messageBox(title, msg, btns);
        });
    };
}); 