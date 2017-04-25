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
                template: '',
                controller: 'ActivesCtrl'
            })
            .when('/workFlowReadCSV', {
                templateUrl: 'partials/readrcv.html',
                controller: 'ActivesReadCSV'
            })
            .when('/workFlowSetRole', {
                templateUrl: 'partials/setrole.html',
                controller: 'ActivesSetRole'
            })
            .when('/workFlowSplitDataByPercent', {
                templateUrl: 'partials/splitdatabypercent.html',
                controller: 'ActivesSplitByPercent'
            })
            .when('/workFlowSVM(SupportVectorMachine)', {
                templateUrl: 'partials/svm.html',
                controller: 'ActivesSVM'
            })
            // If invalid routes, just redirect to the main list view
            .otherwise({redirectTo: '/'});
    }])
    .run(['$rootScope', '$location', function ($rootScope, $location) {
        // 模糊匹配路径
        // $rootScope.$on('$locationChangeStart', function (event, next, current) {
        //     var path = /#\/(workFlowSVM)*/i.exec(next);
        //     console.log(path);
        //     if (path && path[1]) {
        //         $location.path('/workFlowSVM');
        //     }
        // });
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
        $scope.showaction = false;
        $scope.$watch('showaction', function (newValue, oldValue, scope) {
            console.log('newvalue ' + newValue);
            console.log('oldValue ' + oldValue);
        });
        console.log('showaction  ' + $scope.showaction);
    }])
    .controller('ActivesReadCSV', ['$scope', '$rootScope', 'workFlowActive', 'ParseFile', 'workFlowActionReadCSV',
        function ($scope, $rootScope, workFlowActive, ParseFile, workFlowActionReadCSV) {
            $scope.$parent.showaction = true;
            $scope.$watch('csvname', function (newValue, oldValue, scope) {
                if (newValue.indexOf(".csv") >= 0) {
                    if (newValue == $scope.csvname && $scope.hexname != undefined) {
                        console.log("the same csvname," + $scope.csvname + "..." + $scope.hexname);
                        return;
                    }
                    lastidx = newValue.lastIndexOf('/');
                    $scope.hexname = newValue.substring(lastidx + 1).replace('.csv', '.hex');
                    ParseFile.get({csvname: newValue}, function (resp) {
                        if (!resp.error) {
                            $scope.column_names = resp.message['column_names'];
                            $scope.column_types = resp.message['column_types'];
                            $rootScope.column_names = resp.message['column_names'];
                            $rootScope.column_types = resp.message['column_names'];
                        }
                    });
                } else {
                    $scope.column_names = undefined;
                    $scope.column_types = undefined;
                    $scope.hexname = undefined;
                }
            });
            $scope.separators = [",: '44'"];
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
            if ($scope.readcsv != undefined) {
                console.log('restore readcsv data');
                $scope.csvname = $rootScope.readcsv.csvname;
                $scope.hexname = $rootScope.readcsv.hexname;
                $scope.separatorval = $rootScope.readcsv.separatorval;
                $scope.headername = $rootScope.readcsv.headername;
                $scope.useSingleQuotes = $rootScope.readcsv.useSingleQuotes;
                $scope.deleteOnDone = $rootScope.readcsv.deleteOnDone;
            } else {
                $scope.csvname = "/root/hwq/data/rfid_train20170223.csv";
                $scope.separatorval = ",: '44'";
                $scope.headername = "header";
                $scope.useSingleQuotes = false;
                $scope.deleteOnDone = true;
            }
            $scope.save = function () {
                $rootScope.readcsv = {};
                $rootScope.readcsv.csvname = $scope.csvname;
                $rootScope.readcsv.hexname = $scope.hexname;
                $rootScope.readcsv.separatorval = $scope.separatorval;
                $rootScope.readcsv.headername = $scope.headername;
                $rootScope.readcsv.useSingleQuotes = $scope.useSingleQuotes;
                $rootScope.readcsv.deleteOnDone = $scope.deleteOnDone;
                for (key in $rootScope.readcsv) {
                    console.log(key + "..." + $rootScope.readcsv[key]);
                }
                console.log($rootScope.readcsv);
            }
            $scope.run = function () {
                readcsvpost = {
                    csvname: $scope.csvname,
                    hexname: $scope.hexname,
                    separator: $scope.separatorval,
                    useSingleQuotes: $scope.useSingleQuotes,
                    deleteOnDone: $scope.deleteOnDone ? 1 : 0
                }
                var readcsv = new workFlowActionReadCSV(readcsvpost);
                readcsv.$save(function (p, resp) {
                    if (!p.error) {
                        if (!resp.error) {
                            for (key in resp) {
                                console.log(key + ";;;" + resp[key]);
                            }
                            alert('message::' + resp['message']);
                        } else {
                            alert('readcsv post failed, ' + resp.message);
                        }
                    } else {
                        alert('readcsv post failed');
                    }
                });
            }
        }])
    .controller('ActivesSetRole', ['$scope', '$rootScope', 'workFlowActive', 'workFlowActionReadCSV',
        function ($scope, $rootScope, workFlowActive, workFlowActionReadCSV) {
            $scope.$parent.showaction = true;
            $scope.column_names = $rootScope.column_names;
            // $scope.roles = [{
            //     "name": "LABEL",
            //     "value": "LABEL"
            // }];
            if ($rootScope.setrole != undefined) {
                console.log('restore set role ' + $rootScope.setrole.response_column);
                $scope.response_column = $rootScope.setrole.response_column;
            } else if ($scope.column_names != undefined) {
                $scope.response_column = $scope.column_names[0];
            }
            $scope.save = function () {
                console.log('save set role ' + $scope.response_column);
                $rootScope.setrole = {};
                $rootScope.setrole.response_column = $scope.response_column;
            }
            $scope.run = function () {
                console.log($scope.response_column);
                $rootScope.response_column = $scope.response_column;
            }
        }])
    .controller('ActivesSplitByPercent', ['$scope', '$rootScope', 'workFlowActive', 'workFlowActionSplitByPercent',
        function ($scope, $rootScope, workFlowActive, workFlowActionSplitByPercent) {
            console.log('===========================root:' + $rootScope.percent + ",scope:" + $scope.percent);
            $scope.$parent.showaction = true;
            // $scope.percent = ($rootScope.percent == undefined) ? 0.5 : $rootScope.percent;
            //splitparams is like {destination_frame: frame, percentrate: [rate], frame: [ ], seed: random_seed}
            if ($rootScope.splitdatabypercent != undefined) {
                $scope.percent = $rootScope.splitdatabypercent.percent;
                $scope.seed = $rootScope.splitdatabypercent.seed;
            } else {
                $scope.percent = 0.75;
                $scope.seed = Math.floor(Math.random() * 1000000);
            }
            $scope.$watch('percent', function (newValue, oldValue, scope) {
                console.log('newvalue' + $scope.percent);
            });

            $scope.save = function () {
                console.log('save split data ' + $scope.percent + "," + $scope.seed);
                $rootScope.splitdatabypercent = {};
                $rootScope.splitdatabypercent.percent = $scope.percent;
                $rootScope.splitdatabypercent.seed = $scope.seed;
            }
            $scope.run = function () {
                console.log('run ' + $scope.percent);
                hex = $rootScope.readcsv.hexname;
                // hexname = $rootScope.hexname == undefined ? 'rfid_train20170223.hex' : $rootScope.hexname;
                // percentinfo = {
                //     hexname: hexname,
                //     percentrate: [$rootScope.percent],
                //     frame: [hexname + '_' + $rootScope.percent, hexname + '_' + (1 - $rootScope.percent) + "1"],
                //     seed: $rootScope.seed
                // }
                // console.log(percentinfo);
                // var percentinfo = new workFlowActionSplitByPercent(percentinfo);
                // percentinfo.$save(function (p, resp) {
                //     if (!p.error) {
                //         if (!resp.error) {
                //             for (key in resp) {
                //                 console.log(key + ";;;" + resp[key]);
                //             }
                //             alert('message::' + resp['message']);
                //         } else {
                //             alert('splitbydata post failed, ' + resp.message);
                //         }
                //     } else {
                //         alert('splitbydata post failed');
                //     }
                // });
            }
        }])
    .controller('ActivesSVM', ['$scope', '$rootScope', 'workFlowActive', 'workFlowActionReadCSV',
        function ($scope, $rootScope, workFlowActive, workFlowActionReadCSV) {
            $scope.$parent.showaction = true;
            $scope.updaters = ["L2", "L1", "Simple"];
            $scope.gradients = ["Hinge", "Leastsquares", "Logistic"];
            $scope.missingvalueshandlings = ["NotAllowed", "Skip", "MeanImputation"];
            if ($rootScope.readcsv != undefined) {
                readcsv = $rootScope.readcsv;
                $scope.trainingframe = readcsv['hexname'];
            }
            if ($rootScope.svm != undefined) {
                $scope.modelid = $rootScope.svm.modelid;
                $scope.nfolds = $rootScope.svm.nfolds;
                $scope.ignoreconstcols = $rootScope.svm.ignoreconstcols;
                $scope.addintercept = $rootScope.svm.addintercept;
                $scope.stepsize = $rootScope.svm.stepsize;
                $scope.regparam = $rootScope.svm.regparam;
                $scope.convergencetol = $rootScope.svm.convergencetol;
                $scope.minibatchfraction = $rootScope.svm.minibatchfraction;
                $scope.threshold = $rootScope.svm.threshold;
                $scope.updater = $rootScope.svm.updater;
                $scope.gradient = $rootScope.svm.gradient;
                $scope.missingvalueshandling = $rootScope.svm.missingvalueshandling;
            } else {
                $scope.modelid = 'SVM_' + Math.floor(Math.random() * 1000) + '_' + Math.floor(Math.random() * 1000)
                    + Math.floor(Math.random() * 1000);
                $scope.nfolds = 0;
                $scope.ignoreconstcols = true;
                $scope.addintercept = false;
                $scope.stepsize = 1;
                $scope.regparam = 0.01;
                $scope.convergencetol = 0.001;
                $scope.minibatchfraction = 1;
                $scope.threshold = 0;
                $scope.updater = 'L2';
                $scope.gradient = 'Hinge';
                $scope.missingvalueshandling = 'MeanImputation';
            }

            $scope.column_names = $rootScope.column_names;
            $scope.column_types = $rootScope.column_types;
            $scope.save = function () {
                console.log('save svm ');
                $rootScope.svm.modelid = $scope.modelid;
                // $rootScope.svm.hexname = $scope.hexname;
                $rootScope.svm.nfolds = $scope.nfolds;
                $rootScope.svm.ignoreconstcols = $scope.ignoreconstcols;
                $rootScope.svm.addintercept = $scope.addintercept;
                $rootScope.svm.stepsize = $scope.stepsize;
                $rootScope.svm.regparam = $scope.regparam;
                $rootScope.svm.convergencetol = $scope.convergencetol;
                $rootScope.svm.minibatchfraction = $scope.minibatchfraction;
                $rootScope.svm.threshold = $scope.threshold;
                $rootScope.svm.updater = $scope.updater;
                $rootScope.svm.gradient = $scope.gradient;
                $rootScope.svm.missingvalueshandling = $scope.missingvalueshandling;
            }
        }]);