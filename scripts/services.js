(function () {
    'use strict';
    angular.module('cognitoolkit')
        .service('models', function ($http) {
            console.log('JALANDO JSON');
            $http.get('models.json')
                .success(function (data) {
                    console.log('TENEMOS EL JSON');
                    console.log(data);
                });
        });
})();
