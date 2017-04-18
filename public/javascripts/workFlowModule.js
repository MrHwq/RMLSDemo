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

angular.module('workFlowModule', ['ngRoute', 'workFlowService'])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/workFlow', {
                templateUrl: 'partials/list.html',
                controller: 'ActivesCtrl'
            })
            // If invalid routes, just redirect to the main list view
            .otherwise({redirectTo: '/workFlow'});
    }])
    .controller('ActivesCtrl', ['$scope', 'workFlowActive', function ($scope, workFlowActive) {
        workFlowActive.query({}, function (actives) {
            $scope.actives = actives;
            zNodes = JSON.parse(JSON.stringify(actives));
            // for (key in zNodes) {
            //     console.log(zNodes[key]);
            // }
            jsPlumb.ready(function () {
                console.log('jsPlumb is ready to use');

                var color = '#E8C870';

                instance = jsPlumb.getInstance({
                    DragOptions: {cursor: 'pointer', zIndex: 2000},
                    PaintStyle: {stroke: '#666'},
                    EndpointHoverStyle: {fill: 'yellow'},
                    HoverPaintStyle: {stroke: 'orange'},
                    EndpointStyle: {width: 20, height: 36, stroke: '#666'},
                    Endpoint: 'Rectangle',
                    Anchors: ['TopCenter', 'TopCenter'],
                    Container: 'canvas'
                });

                instance.doWhileSuspended(function () {
                    var arrowCommon = {foldback: 0.8, fillStyle: color, width: 5};
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

    }]);