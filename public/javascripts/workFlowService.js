/**
 * Created by weiqiang on 2017/4/17.
 */
angular.module('workFlowService', ['ngResource'])
    .factory('workFlowActive', ["$resource", function ($resource) {
        return $resource('actives/:activeId', {}, {
            //- Use this method for getting a list of polls
            query: {method: 'GET', params: {activeId: 'actives'}, isArray: true}

        });
    }]);
    // .factory('socket', ["$rootScope", function ($rootScope) {
    // }]);