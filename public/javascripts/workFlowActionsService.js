/**
 * Created by weiqiang on 2017/4/17.
 */
angular.module('workFlowActionsService', ['ngResource'])
    .factory('ParseFile', ["$resource", function ($resource) {
        return $resource('actions/parsefile/:csvname', {}, {
            query: {method: 'GET', params: {csvname: 'csvname'}, isArray: true}
        });
    }])
    .factory('workFlowActionReadCSV', ["$resource", function ($resource) {
        return $resource('actions/readcsv', {}, {
            query: {method: 'GET', params: {}, isArray: true}
        });
    }])
    .factory('workFlowActionSplitByPercent', ["$resource", function ($resource) {
        return $resource('actions/splitdatabypercent', {}, {
            query: {method: 'GET', params: {}, isArray: true}
        });
    }]);