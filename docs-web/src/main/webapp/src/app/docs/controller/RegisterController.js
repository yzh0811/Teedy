'use strict';

/**
 * Registration controller.
 */
angular.module('docs').controller('RegisterController', function($scope, $state, Restangular, $translate, $dialog) {
    console.log('RegisterController initialized');
    
    $scope.register = function() {
        console.log('Register function called', {
            username: $scope.username,
            email: $scope.email
        });
        
        // Prevent default form submission
        event.preventDefault();
        
        Restangular.one('user').post('register', {
            username: $scope.username,
            password: $scope.password,
            email: $scope.email
        }).then(function() {
            console.log('Registration successful');
            var title = $translate.instant('registration.success.title');
            var msg = $translate.instant('registration.success.message');
            var btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
            $dialog.messageBox(title, msg, btns).then(function() {
                $state.go('login');
            });
        }, function(data) {
            console.error('Registration failed', data);
            var title = $translate.instant('registration.error.title');
            var msg = $translate.instant('registration.error.message');
            var btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
            $dialog.messageBox(title, msg, btns);
        });
    };
}); 