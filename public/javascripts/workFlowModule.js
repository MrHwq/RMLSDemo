/**
 * Created by weiqiang on 2017/4/17.
 */

var instance;
var zNodes;
var setting = {
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeDrag: beforeDrag,
        beforeDrop: beforeDrop,
        onDrag: onDrag,
        onDrop: onDrop,
    }
};
ztreeinit = false;
angular.module('workFlowModule', ['ngRoute', 'workFlowService', 'workFlowActionsService'])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/workFlow', {
                templateUrl: 'partials/readrcv.html',
                controller: 'ActivesCtrl'
            })
            // If invalid routes, just redirect to the main list view
            .otherwise({redirectTo: '/workFlow'});
    }])
    .controller('ActivesCtrl', ['$scope', 'workFlowActive', 'workFlowAction', function ($scope, workFlowActive, workFlowAction) {
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
            hexname: $scope.hexname
        };
        $scope.parse = function () {
            readcsvpost = $scope.readcsvpost;
            var readcsv = new workFlowAction(readcsvpost);

            // Call API to save poll to the database
            readcsv.$save(function (p, resp) {
                if (!p.error) {
                    // If there is no error, redirect to the main view
                    alert("asdasd");
                } else {
                    alert('readcsv post failed');
                }
            });
        }
        if (!ztreeinit) {
            ztreeinit = true;
            workFlowActive.query({}, function (actives) {
                $scope.actives = actives;
                zNodes = JSON.parse(JSON.stringify(actives));
                // for (key in zNodes) {
                //     console.log(zNodes[key]);
                // }
                jsPlumb.ready(function () {
                    console.log('jsPlumb is ready to use');
                    instance = jsPlumb.getInstance({
                        DragOptions: {cursor: 'pointer', zIndex: 2000},
                        PaintStyle: {stroke: '#666'},
                        EndpointHoverStyle: {fill: 'yellow'},
                        HoverPaintStyle: {stroke: 'orange'},
                        EndpointStyle: {width: 20, height: 36, stroke: '#666'},
                        Endpoint: 'Rectangle',
                        Anchors: ['TopCenter', 'TopCenter'],
                        Container: 'canvas',
                        ConnectionOverlays: [
                            ["Arrow", {
                                location: 1,
                                visible: true,
                                width: 21,
                                length: 11,
                                id: "ARROW"
                            }],
                            ["Label", {
                                location: 0.1,
                                id: "label",
                                cssClass: "aLabel"
                            }]
                        ],
                    });

                    instance.bind("connection", function (info, originalEvent) {
                        updateConnections(info.connection);
                    });
                    instance.bind("connectionDetached", function (info, originalEvent) {
                        updateConnections(info.connection, true);
                    });

                    instance.bind("connectionMoved", function (info, originalEvent) {
                        //  only remove here, because a 'connection' event is also fired.
                        // in a future release of jsplumb this extra connection event will not
                        // be fired.
                        updateConnections(info.connection, true);
                    });

                    instance.bind("click", function (component, originalEvent) {
                        alert("click!")
                    });

                    instance.doWhileSuspended(function () {
                        // var arrowCommon = {foldback: 0.8, fillStyle: '#E8C870', width: 5};
                        instance.draggable($('.node'));
                    });

                    jsPlumb.fire('jsFlowLoaded', instance);
                    // $.fn.zTree.destroy();
                    $.fn.zTree.init($('#treeboxbox_tree'), setting, zNodes);
                });
            });

            // $scope.active = workFlow.get({activeId: 223}, function (info) {
            //     console.log('info:' + info);
            // });
            // console.log(JSON.stringify($scope.active));
        }
    }])
;