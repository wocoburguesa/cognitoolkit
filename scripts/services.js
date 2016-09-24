(function () {
    'use strict';
    angular.module('cognitoolkit')
        .service('models', function ($http) {
            return $http.get('models.json');
        });
})();
