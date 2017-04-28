/**
 * Created by weiqiang on 2017/4/28.
 */

function drawPlots(parentId, data) {
    var graph = Flotr.draw(document.getElementById(parentId), [data], {
        xaxis: {
            minorTickFreq: 4
        },
        grid: {
            minorVerticalLines: true
        }
    });
}