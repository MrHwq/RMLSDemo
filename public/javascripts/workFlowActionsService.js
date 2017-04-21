/**
 * Created by weiqiang on 2017/4/17.
 */
angular.module('workFlowActionsService', ['ngResource'])
    .factory('workFlowAction', ["$resource", function ($resource) {
        return $resource('actions/readcsv', {}, {
            //- Use this method for getting a list of polls
            query: {method: 'GET', params: {}, isArray: true}
        });
    }]);