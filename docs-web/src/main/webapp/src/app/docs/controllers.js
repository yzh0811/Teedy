'use strict';

// Load all controllers
angular.module('docs')
    .controller('RegisterController', require('./controller/RegisterController'))
    .controller('SettingsRegistration', require('./controller/SettingsRegistration')); 