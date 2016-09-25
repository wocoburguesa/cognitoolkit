(function () {
    'use strict';
    angular.module('cognitoolkit')
        .service('models', function ($http) {
            return $http.get('models.json');
        })
        .service('text', function ($http) {
            return $http.get('text.csv');
        });
})();
