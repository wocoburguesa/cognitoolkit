(function () {
    'use strict';
    angular.module('cognitoolkit')
        .constant('frequencyMap', {
            1: 'high',
            2: 'medium',
            3: 'low'
        })
        .constant('topics', [
            'Explaining',
            'Modeling',
            'Brainstorming',
            'Business',
            'Deciding',
            'Developing',
            'Experimenting',
            'Influencing',
            'Interpreting',
            'Managing',
            'Mitigating',
            'Negotiating',
            'Reasoning',
            'Competing',
            'Internet',
            'Investing',
            'Learning',
            'Market Failure',
            'Marketing',
            'Military',
            'Nature',
            'Philosophy',
            'Political Failure',
            'Productivity',
            'Sports',
            'Strategizing'//,
//            ''
        ]);
})();
