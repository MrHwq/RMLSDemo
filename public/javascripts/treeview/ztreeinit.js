/**
 * Created by weiqiang on 2017/4/24.
 */

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

var jsplumbinit = function () {
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
    // d3.select("#flow-panel").on('click', function () {
    //     window.location.href = "#/";
    // })
    // $.fn.zTree.destroy();
    $.fn.zTree.init($('#treeboxbox_tree'), setting, zNodes);
}