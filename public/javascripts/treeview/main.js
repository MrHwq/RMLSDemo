function addNode(parentId, nodeId, nodeLabel, position) {
    // var offset = $("#" + parentId).offset();
    //
    // if (position.y < offset.top || position.y > offset.top + $("#" + parentId).height()) {
    //     return undefined;
    // } else {
    //     console.log("in ver");
    // }
    // console.log(offset.left);
    // console.log(offset.left + $("#" + parentId).width());
    // if (position.x < offset.left || position.x > offset.left + $("#" + parentId).width()) {
    //     return undefined;
    // } else {
    //     console.log("in hor");
    // }
    var panel = d3.select("#" + parentId);
    panel.append('div')
        .style('width', '120px')
        .style('height', '90px')
        .style('position', 'absolute')
        .style('top', position.y + "px")
        .style('left', position.x + "px")
        .style('border', '2px #000000 solid')
        .attr('align', 'center')
        .attr('id', nodeId)
        .classed('node', true)
        .text(nodeLabel);
// .style('background-color', 'gray')
    return jsPlumb.getSelector('#' + nodeId)[0];
}

function addPorts(instance, node, ports, type) {
    //Assume horizental layout
    var number_of_ports = ports.length;
    var i = 0;
    var height = $(node).height();  //Note, jquery does not include border for height
    var y_offset = 1 / ( number_of_ports + 1);
    var y = 0;
    var connectorPaintStyle = {
            lineWidth: 5,
            strokeStyle: "#deea18",
            joinstyle: "round"
        },
        // .. and this is the hover style.
        connectorHoverStyle = {
            lineWidth: 7,
            strokeStyle: "#2e2aF8"
        };
    // console.log("node ports " + number_of_ports + ":" + type);
    for (; i < number_of_ports; i++) {
        var anchor = [0, 0, 0, 0];
        var paintStyle = {radius: 9, fillStyle: '#FF8891'};
        var isSource = false, isTarget = false;
        if (type === 'output') {
            anchor[0] = 1;
            paintStyle.fillStyle = '#D4FFD6';
            isSource = true;
        } else {
            isTarget = true;
        }

        anchor[1] = y + y_offset;
        y = anchor[1];
        instance.addEndpoint(node, {
            uuid: node.getAttribute("id") + "-" + ports[i],
            endpoint: ["Dot", {radius: 11}],
            paintStyle: {fill: isSource ? '#FF8891' : "#00f"},
            anchor: anchor,
            maxConnections: -1,
            isSource: isSource,
            isTarget: isTarget,
            connectorStyle: {stroke: "#316b31", strokeWidth: 6},
            connector: ["Bezier", {curviness: 63}],
        });
    }
}

function connectPorts(instance, node1, port1, node2, port2) {
    // declare some common values:
    var color = "black";
    var arrowCommon = {foldback: 0.8, fillStyle: color, width: 15},
        // use three-arg spec to create two different arrows with the common values:
        overlays = [
            ["Arrow", {location: 0.8}, arrowCommon],
            ["Arrow", {location: 0.2, direction: -1}, arrowCommon]
        ];

    var uuid_source = node1.getAttribute("id") + "-" + port1;
    var uuid_target = node2.getAttribute("id") + "-" + port2;

    instance.connect({uuids: [uuid_source, uuid_target]});
}

function beforeDrag(treeId, treeNodes) {
    for (var i = 0, l = treeNodes.length; i < l; i++) {
        if (treeNodes[i].children != null) {
            return false;
        }
        if (treeNodes[i].drag === false) {
            return false;
        }
    }
    return true;
}
function beforeDrop(treeId, treeNodes, targetNode, moveType) {
    return false;
    return targetNode ? targetNode.drop !== false : true;
}

function onDrag(event, treeId, treeNodes) {
    console.log("onDrag  ");
    // console.log(treeNodes[0]);
}

function onDrop(event, treeId, treeNodes, targetNode, moveType) {
    // var mx = event.originalEvent.offsetX;
    // var my = event.originalEvent.offsetY;
    var mx = event.originalEvent.pageX;
    var my = event.originalEvent.pageY;
    var uid = new Date().getTime();
    // var node = treeNodes[0];
    // var names = Object.getOwnPropertyNames(node);
    // console.log(names);
    // for (idx in names) {
    //     console.log(treeNodes[0][names[idx]]);
    // }
    var node = addNode('flow-panel', treeNodes[0].tId + uid, treeNodes[0].name, {x: mx, y: my});
    if (node) {
        for (idx in zNodes) {
            var activenode = zNodes[idx];
            if (activenode.id == treeNodes[0].id) {
                // console.log("input ports:::" + activenode.input);
                // console.log("output ports:::" + activenode.output);
                if (activenode.input > 0) {
                    var inputs = new Array();
                    for (var i = 0; i < activenode.input; ++i) {
                        inputs.push('in' + i);
                    }
                    // for (a in inputs) {
                    //     console.log("inputs has " + a);
                    // }
                    addPorts(instance, node, inputs, 'input');
                }
                if (activenode.output > 0) {
                    var outputs = new Array();
                    for (var i = 0; i < activenode.output; ++i) {
                        outputs.push('out' + i);
                    }
                    addPorts(instance, node, outputs, 'output');
                }
                break;
            }
        }
        // addPorts(instance, node, ['out'], 'output');
        // addPorts(instance, node, ['in1', 'in2'], 'input');
        instance.draggable($(node));
    }
}

