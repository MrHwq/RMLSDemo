/**
 * Created by weiqiang on 2017/4/17.
 */
angular.module('workFlowActionsService', ['ngResource'])
    .factory('ParseFile', ["$resource", function ($resource) {
        return $resource('actions/parsefile/:csvname', {}, {
            query: {method: 'GET', params: {csvname: 'csvname'}, isArray: true}
        });
    }])
    .factory('ReadCSV', ["$resource", function ($resource) {
        return $resource('actions/readcsv', {}, {
            query: {method: 'GET', params: {}, isArray: true}
        });
    }])
    .factory('SplitByPercent', ["$resource", function ($resource) {
        return $resource('actions/splitdatabypercent', {}, {
            query: {method: 'GET', params: {}, isArray: true}
        });
    }])
    .factory('SVM', ["$resource", function ($resource) {
        return $resource('actions/svm', {}, {
            query: {method: 'GET', params: {}, isArray: true}
        });
    }])
    .factory('ApplyModel', ["$resource", function ($resource) {
        return $resource('actions/applymodel', {}, {
            query: {method: 'GET', params: {}, isArray: true}
        });
    }]);