(function () {
    'use strict';
    angular.module('cognitoolkit')
        .controller('ModelsCtrl', function (models, frequencyMap, topics, text) {
            var $ctrl = this;

            text.success(function (data) {
                window.data = data;
                var words = {};
                var sortable = [];
                var desc;

                for (var i = 0; i < data.length; i++) {
                    desc = data[i]['New column'].split(' ');

                    for (var j = 0; j < desc.length; j++) {
                        if (desc[j].length > 4) {
                            if (words[desc[j]]) {
                                words[desc[j]]++;
                            } else {
                                words[desc[j]] = 1;
                            }
                        }
                    }
                }

                for (var key in words) {
                    sortable.push({
                        word: key,
                        count: words[key]
                    });
                }

                window.data2 = sortable.sort(function (a, b) {
                    return b.count - a.count;
                });
            });

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

            $("#jumpTo").on("click", function(e) {
                console.log(e);
                e.preventDefault();
                $("html, body").animate({
                    scrollTop: $('#searchSection').offset().top
                }, 600);
            });

            models.success(function (data) {
                console.log('ASI SE VE MODELS AL FINAL:', data);
                $ctrl.models = data;
            });
      });
})();
