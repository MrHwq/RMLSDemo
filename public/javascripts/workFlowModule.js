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
            .when('/workFlowReadCSV/:id', {
                templateUrl: 'partials/readrcv.html',
                controller: 'ActivesReadCSV'
            })
            .when('/workFlowSetRole/:id', {
                templateUrl: 'partials/setrole.html',
                controller: 'ActivesSetRole'
            })
            .when('/workFlowSplitDataByPercent/:id', {
                templateUrl: 'partials/splitdatabypercent.html',
                controller: 'ActivesSplitByPercent'
            })
            .when('/workFlowSVM(SupportVectorMachine)/:id', {
                templateUrl: 'partials/svm.html',
                controller: 'ActivesSVM'
            })
            .when('/workFlowApplyModel/:id', {
                templateUrl: 'partials/applymodel.html',
                controller: 'ActivesApplyModel'
            })
            .when('/workFlowPerformanceROC/:id', {
                templateUrl: 'partials/performanceroc.html',
                controller: 'ActivesPerformanceROC'
            });
        // If invalid routes, just redirect to the main list view
        // .otherwise({redirectTo: '/'});
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
                jsPlumb.ready(jsplumbinit);
            });
        }
        $scope.$watch('showaction', function (newValue, oldValue, scope) {
            console.log('newvalue ' + newValue);
            console.log('oldValue ' + oldValue);
        });
        $scope.showaction = false;
        console.log('showaction  ' + $scope.showaction);
    }])
    .controller('ActivesReadCSV', ['$scope', '$rootScope', '$routeParams', 'ParseFile', 'ReadCSV',
        function ($scope, $rootScope, $routeParams, ParseFile, ReadCSV) {
            var id = $routeParams[id];
            $scope.$parent.showaction = true;
            $scope.ColumnTypes = ['Numeric', 'Enum', 'Time', 'UUID', 'String', 'Invalid'];
            if ($rootScope.column_names != undefined) {
                $scope.column_names = $rootScope.column_names;
            }
            if ($rootScope.column_types != undefined) {
                $scope.column_types = $rootScope.column_types;
            }
            $scope.$watch('csvname', function (newValue, oldValue, scope) {
                if (newValue.indexOf(".csv") >= 0) {
                    if (newValue == oldValue && $scope.hexname != undefined) {
                        console.log("the same csvname," + $scope.csvname + "..." + $scope.hexname);
                        return;
                    }
                    lastidx = newValue.lastIndexOf('/');
                    $scope.hexname = newValue.substring(lastidx + 1).replace('.csv', '.hex');
                    req = ParseFile.get({csvname: newValue}, function (resp) {
                        let ret = new ParseFileRet(resp);
                        $scope.column_names = ret.getColumnNames();
                        $scope.column_types = ret.getColumnTypes();
                        $scope.iserror = false;
                    }, function (fail) {
                        let ret = new ErrorRet(fail);
                        $scope.column_names = undefined;
                        $scope.column_types = undefined;
                        $scope.iserror = true;
                        $scope.errormsg = ret.toString();
                    });
                } else {
                    $scope.column_names = undefined;
                    $scope.column_types = undefined;
                    $scope.hexname = undefined;
                    $scope.iserror = false;
                }
            });
            $scope.separators = [",: '44'"];
            $scope.hasHeaders = [{
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
                $scope.csvname = "/root/hwq/data/czc.csv";
                $scope.separatorval = ",: '44'";
                $scope.headername = "header";
                $scope.useSingleQuotes = false;
                $scope.deleteOnDone = true;
            }
            $scope.save = function () {
                $rootScope.column_names = $scope.column_names;
                $rootScope.column_types = $scope.column_types;
                $rootScope.readcsv = {};
                $rootScope.readcsv.csvname = $scope.csvname;
                $rootScope.readcsv.hexname = $scope.hexname;
                $rootScope.readcsv.separatorval = $scope.separatorval;
                $rootScope.readcsv.headername = $scope.headername;
                $rootScope.readcsv.useSingleQuotes = $scope.useSingleQuotes;
                $rootScope.readcsv.deleteOnDone = $scope.deleteOnDone;
                console.log($rootScope.column_types);
            }
            $scope.run = function () {
                readcsvpost = {
                    csvname: $scope.csvname,
                    hexname: $scope.hexname,
                    separator: $scope.separatorval,
                    useSingleQuotes: $scope.useSingleQuotes,
                    deleteOnDone: $scope.deleteOnDone ? 1 : 0
                }
                if ($rootScope.column_types != undefined) {
                    readcsvpost.column_types = $rootScope.column_types;
                }
                let readcsv = new ReadCSV(readcsvpost);
                readcsv.$save(function (resp) {
                    let ret = new ReadCsvRet(resp);
                    alert('message::' + ret.getJob());
                }, function (fail) {
                    alert('readcsv post failed, ' + fail);
                });
            }
        }])
    .controller('ActivesSetRole', ['$scope', '$rootScope', 'ReadCSV',
        function ($scope, $rootScope, ReadCSV) {
            $scope.$parent.showaction = true;
            $scope.column_names = $rootScope.column_names;
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
    .controller('ActivesSplitByPercent', ['$scope', '$rootScope', 'SplitByPercent',
        function ($scope, $rootScope, SplitByPercent) {
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
                hexname = ($rootScope.hexname == undefined ? 'czc.hex' : $rootScope.hexname)
                $rootScope.splitdatabypercent.frame1 = hexname + '_' + $scope.percent;
                $rootScope.splitdatabypercent.frame2 = hexname + '_' + (1 - $scope.percent);
                if ($scope.percent == 0.5) {
                    $rootScope.splitdatabypercent.frame2 += '.1';
                }
            }
            $scope.run = function () {
                console.log('run ' + $scope.percent);
                hexname = ($rootScope.hexname == undefined ? 'czc.hex' : $rootScope.hexname);
                frame1 = hexname + '_' + $scope.percent;
                frame2 = hexname + '_' + (1 - $scope.percent);
                if ($scope.percent == 0.5) {
                    frame2 += '.1';
                }
                percentinfo = {
                    hexname: hexname,
                    percentrate: [$scope.percent],
                    frame: [frame1, frame2],
                    seed: $scope.seed
                }
                console.log(percentinfo);
                var split = new SplitByPercent(percentinfo);
                split.$save(function (resp) {
                    ret = new SplitDataByPercentRet(resp);
                    console.log(ret.getAst());
                }, function (fail) {
                    alert('splitbydata post failed, ' + fail);
                });
            }
        }])
    .controller('ActivesSVM', ['$scope', '$rootScope', 'SVM',
        function ($scope, $rootScope, SVM) {
            $scope.$parent.showaction = true;
            $scope.updaters = ["L2", "L1", "Simple"];
            $scope.gradients = ["Hinge", "Leastsquares", "Logistic"];
            $scope.missingvalueshandlings = ["NotAllowed", "Skip", "MeanImputation"];
            if ($rootScope.readcsv != undefined) {
                readcsv = $rootScope.readcsv;
                $scope.hexname = readcsv['hexname'];
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
                $scope.modelid = `SVM_${Math.floor(Math.random() * 100000)}_${Math.floor(Math.random() * 100000)}_${Math.floor(Math.random() * 100000)}`;
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
            $scope.ignored_columns = {};
            $scope.$watch('ignored_columns', function (newValue, oldValue, scope) {
                console.log($scope.ignored_columns);
            })
            $scope.save = function () {
                console.log('save svm ');
                // console.log($scope.ignored_columns);
                $rootScope.svm = {};
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
            if ($rootScope.setrole == undefined) {
                $rootScope.setrole = {};
                $rootScope.setrole.response_column = 'churn';
            }
            $scope.run = function () {
                svminfo = {
                    'model_id': $scope.modelid,
                    'hexname': $scope.hexname,
                    'response_column': $rootScope.setrole.response_column,
                    'nfolds': $scope.nfolds,
                    'ignore_const_cols': $scope.ignoreconstcols,
                    'add_intercept': $scope.addintercept,
                    'step_size': $scope.stepsize,
                    'reg_param': $scope.regparam,
                    'convergence_tol': $scope.convergencetol,
                    'mini_batch_fraction': $scope.minibatchfraction,
                    'threshold': $scope.threshold,
                    'updater': $scope.updater,
                    'gradient': $scope.gradient,
                    'missing_values_handling': $scope.missingvalueshandling
                }
                console.log(svminfo);
                var svm = new SVM(svminfo);
                svm.$save(function (resp) {
                    let ret = new SVMRet(resp);
                    console.log(ret.getJob());
                }, function (fail) {
                    console.log(fail);
                });
            }
        }])
    .controller('ActivesApplyModel', ['$scope', '$rootScope', 'ApplyModel',
        function ($scope, $rootScope, ApplyModel) {
            $scope.$parent.showaction = true;
            "use strict";
            if ($rootScope.svm != undefined) {
                $scope.modelid = $rootScope.svm.modelid;
            } else {
            }
            if ($rootScope.splitdatabypercent != undefined) {
                $scope.datain = $rootScope.splitdatabypercent.frame1;
            } else {
                $scope.datain = 'czc.hex_0.75';
            }
            $scope.run = function () {
                var modelinfo = {modelid: $scope.modelid, datain: $scope.datain};
                // var modelinfo = {modelid: 'SVM_17711_3845_6376', datain: 'czc.hex_0.75'};
                console.log(modelinfo);
                var apply = new ApplyModel(modelinfo);
                apply.$save(function (resp) {
                    var applyret = new ApplyModelRet(resp);
                    // console.log(resp.message);
                    $rootScope.applymodel = {};
                    $rootScope.applymodel.scores = resp.message.thresholds_and_metric_scores;
                    console.log($rootScope.applymodel.scores);
                }, function (fail) {
                    console.log(fail);
                });
            }
        }])
    .controller('ActivesPerformanceROC', ['$scope', '$rootScope', function ($scope, $rootScope) {
        "use strict";
        $scope.$parent.showaction = true;
        $scope.rocShow = true;
        $rootScope.$watch('applymodel', function (newValue, oldValue, scope) {
            if (newValue != undefined && newValue.scores != undefined) {
                console.log(newValue.scores);
                var x, y;
                var columns = newValue.scores.columns;
                for (var idx in columns) {
                    if (columns[idx].name == 'fpr') {
                        x = idx;
                        console.log("find x");
                    } else if (columns[idx].name == 'tpr') {
                        y = idx;
                        console.log("find y");
                    }
                }
                var data = newValue.scores.data;
                var xs = data[x];
                var ys = data[y];
                var plots = [];
                for (let i = 0; i < xs.length; ++i) {
                    plots.push([xs[i], ys[i]]);
                }
                drawPlots('performanceroc', plots);
                $scope.rocShow = true;
            } else {
                $scope.rocShow = false;
            }
        });
    }]);