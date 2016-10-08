(function () {
    'use strict';
    angular.module('cognitoolkit')
        .controller('ModelsCtrl', function (models, frequencyMap, topics, /*text,*/ searchIndex) {
            var $ctrl = this;
            var searchMap;

            var urlMap = {};

            function generateWordIndex(wordStats) {
                var result = {};

                for (var i = 0; i < 10000; i++) {
                    result[wordStats[i].word] = wordStats[i].stats.appearsIn;
                }

                return result;
            }

            function searchSingleWord(word) {
                var upper = word.toUpperCase();

                if (searchMap[upper]) {
                    for (var i = 0; i < searchMap[upper].length; i++) {
                        if ($ctrl.models[searchMap[upper][i]]) {
                            $ctrl.models[searchMap[upper][i]].hide = false;
                        }
                    }
                }
            }

/*            text.success(function (data) {
                window.data = data;
                window.totalCount = 0;
                var words = {};
                var sortable = [];
                var desc, url, model;

                for (var i = 0; i < data.length; i++) {
                    desc = data[i]['New column'].split(' ');
                    url = data[i]['url'];
                    model = urlMap[url];

                    for (var j = 0; j < desc.length; j++) {
                        window.totalCount++;
                        if (desc[j].length > 4) {
                            if (words[desc[j]]) {
                                words[desc[j]].count++;

                                if (words[desc[j]].appearsIn.indexOf(model) === -1) {
                                    words[desc[j]].appearsIn.push(model);
                                }
                            } else {
                                words[desc[j]] = {
                                    count: 1,
                                    appearsIn: [model]
                                };
                            }
                        }
                    }
                }

                for (var key in words) {
                    sortable.push({
                        word: key,
                        stats: words[key]
                    });
                }

                window.data2 = sortable.sort(function (a, b) {
                    return b.stats.count - a.stats.count;
                });

                window.data3 = generateWordIndex(window.data2);
            });
*/

            searchIndex.success(function (data) {
                searchMap = data;

                for (var key in data) {
                    data[key.toUpperCase()] = data[key];
                }
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

            $ctrl.search = function () {
                var words = $ctrl.searchQuery.split(' ');

                if (!$ctrl.searchQuery || !searchMap) {
                    for (var i = 0; i < $ctrl.models.length; i++) {
                        $ctrl.models[i].hide = false;
                    }
                    return;
                }

                for (var i = 0; i < $ctrl.models.length; i++) {
                    $ctrl.models[i].hide = true;
                }
                for (var i = 0; i < words.length; i++) {
                    searchSingleWord(words[i]);
                }
            };

            $("#jumpTo").on("click", function(e) {
                e.preventDefault();
                $("html, body").animate({
                    scrollTop: $('#searchSection').offset().top
                }, 600);
            });

            models.success(function (data) {
                $ctrl.models = data;

                for (var i = 0; i < data.length; i++) {
                    urlMap[data[i].enlace] = i;
                }
            });
      });
})();
