(function () {
    'use strict';
    angular.module('cognitoolkit')
        .controller('ModelsCtrl', function (models, frequencyMap, topics) {
            var $ctrl = this;

            $ctrl.currentTopic = '';

            $ctrl.frequencyFilter = {
                high: false,
                medium: false,
                low: false
            };

            $ctrl.topics = topics;

            $ctrl.shouldShow = function (model) {
                var frequencyString = frequencyMap[model['frecuencia*']]

                if (!$ctrl.frequencyFilter.high &&
                    !$ctrl.frequencyFilter.medium &&
                    !$ctrl.frequencyFilter.low) {
                    return model.tema == $ctrl.currentTopic ||
                        !$ctrl.currentTopic;
                }

                return $ctrl.frequencyFilter[frequencyString] &&
                    (model.tema == $ctrl.currentTopic || !$ctrl.currentTopic);
            };

            models.success(function (data) {
                console.log('ASI SE VE MODELS AL FINAL:', data);
                $ctrl.models = data;
            });
      });
})();
