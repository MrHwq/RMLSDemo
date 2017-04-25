/**
 * Created by weiqiang on 2017/4/17.
 */

var instance;
var zNodes;

ztreeinit = false;

globaltree = {};
angular.module('workFlowModule', ['ngRoute', 'workFlowService', 'workFlowActionsService'])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/', {
                template: ''
            })
            .when('/workFlowReadCSV', {
                templateUrl: 'partials/readrcv.html',
                controller: 'ActivesReadCSV'
            })
            .when('/workFlowSetRole', {
                templateUrl: 'partials/setrole.html',
                controller: 'ActivesSetRole'
            })
            .when('/workFlowSplitByPercent', {
                templateUrl: 'partials/splitdatabypercent.html',
                controller: 'ActivesSplitByPercent'
            })
            // If invalid routes, just redirect to the main list view
            .otherwise({redirectTo: '/'});
    }])
    .controller('ActivesCtrl', ['$scope', 'workFlowActive', function ($scope, workFlowActive) {
        if (!ztreeinit) {
            ztreeinit = true;
            workFlowActive.query({}, function (actives) {
                $scope.actives = actives;
                zNodes = JSON.parse(JSON.stringify(actives));
                // for (key in zNodes) {
                //     console.log(zNodes[key]);
                // }
                jsPlumb.ready(jsplumbinit);
            });

            // $scope.active = workFlow.get({activeId: 223}, function (info) {
            //     console.log('info:' + info);
            // });
            // console.log(JSON.stringify($scope.active));
        }
        $scope.showaction = true;
        $scope.click = function () {
            $scope.showaction = !$scope.showaction;
            alert('aasd');
        }
    }])
    .controller('ActivesReadCSV', ['$scope', '$rootScope', 'workFlowActive', 'workFlowActionReadCSV',
        function ($scope, $rootScope, workFlowActive, workFlowActionReadCSV) {
            $scope.showaction = true;
            $scope.csvname = "/root/hwq/data/rfid_train20170223.csv";
            $scope.$watch('csvname', function (newValue, oldValue, scope) {
                if (newValue.indexOf(".csv") >= 0) {
                    lastidx = newValue.lastIndexOf('/');
                    $scope.hexname = newValue.substring(lastidx + 1).replace('.csv', '.hex');
                } else {
                    $scope.hexname = null;
                }
            });
            $scope.separators = [",: '44'"];
            $scope.separatorval = ",: '44'";
            $scope.hasHeaders = [
                {
                    "name": "auto",
                    "value": "Auto"
                }, {
                    "name": "header",
                    "value": "First row contains column names"
                }, {
                    "name": "data",
                    "value": "First row contains data"
                }];
            $scope.headername = "header";
            $scope.useSingleQuotes = false;
            $scope.deleteOnDone = true;
            $scope.readcsvpost = {
                csvname: $scope.csvname,
                hexname: $scope.hexname,
                separator: $scope.separatorval,
                useSingleQuotes: $scope.useSingleQuotes,
                deleteOnDone: $scope.deleteOnDone ? 1 : 0
            };
            $scope.parse = function () {
                $rootScope.csvname = $scope.csvname;
                $rootScope.hexname = $scope.hexname;
                // var readcsv = new workFlowActionReadCSV($scope.readcsvpost);
                // readcsv.$save(function (p, resp) {
                //     if (!p.error) {
                //         if (!resp.error) {
                //             for (key in resp) {
                //                 console.log(key + ";;;" + resp[key]);
                //             }
                //             alert('message::' + resp['message']);
                //         } else {
                //             alert('readcsv post failed, ' + resp.message);
                //         }
                //     } else {
                //         alert('readcsv post failed');
                //     }
                // });
            }
        }])
    .controller('ActivesSetRole', ['$scope', '$rootScope', 'workFlowActive', 'workFlowActionReadCSV',
        function ($scope, $rootScope, workFlowActive, workFlowActionReadCSV) {
            $scope.roles = [{
                "name": "LABEL",
                "value": "LABEL"
            }];
            $scope.role = $scope.roles[0];
            $rootScope.role = $scope.role.value;
        }])
    .controller('ActivesSplitByPercent', ['$scope', '$rootScope', 'workFlowActive', 'workFlowActionSplitByPercent',
        function ($scope, $rootScope, workFlowActive, workFlowActionSplitByPercent) {
            console.log('===========================root:' + $rootScope.percent + ",scope:" + $scope.percent);
            // $scope.percent = ($rootScope.percent == undefined) ? 0.5 : $rootScope.percent;
            $scope.percent = 0.5;
            console.log('percent=' + $scope.percent);
            $scope.seed = ($rootScope.seed == undefined)
                ? Math.floor(Math.random() * 1000000) : $rootScope.seed;
            //splitparams is like {destination_frame: frame, percentrate: [rate], frame: [ ], seed: random_seed}

            $scope.$watch('percent', function (newValue, oldValue, scope) {
                console.log('newvalue' + $scope.percent);
            });

            $scope.parse = function () {
                console.log('scope::' + $scope.percent);
                $rootScope.percent = $scope.percent;
                $rootScope.seed = $scope.seed;
                hexname = $rootScope.hexname == undefined ? 'rfid_train20170223.hex' : $rootScope.hexname;
                percentinfo = {
                    hexname: hexname,
                    percentrate: [$rootScope.percent],
                    frame: [hexname + '_' + $rootScope.percent, hexname + '_' + (1 - $rootScope.percent) + "1"],
                    seed: $rootScope.seed
                }
                console.log(percentinfo);
                var percentinfo = new workFlowActionSplitByPercent(percentinfo);
                percentinfo.$save(function (p, resp) {
                    if (!p.error) {
                        if (!resp.error) {
                            for (key in resp) {
                                console.log(key + ";;;" + resp[key]);
                            }
                            alert('message::' + resp['message']);
                        } else {
                            alert('splitbydata post failed, ' + resp.message);
                        }
                    } else {
                        alert('splitbydata post failed');
                    }
                });
            }
        }]);