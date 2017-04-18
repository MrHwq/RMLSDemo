/**
 * Created by weiqiang on 2017/4/18.
 */
var express = require('express');
var router = express.Router();
var activeconfig = require('./actives.json');

// var zNodes = [
//     {id: 1, pId: 0, name: "Composition", open: true},
//     {id: 11, pId: 1, name: "Super Operator"},
//     {id: 2, pId: 0, name: "General Operators", open: true},
//     {id: 21, pId: 2, name: "Predict", open: true},
//     {id: 211, pId: 21, name: "Apply Model"},
//     {id: 22, pId: 2, name: "Performance"},
//     {id: 221, pId: 22, name: "Compare Performance"},
//     {id: 222, pId: 22, name: "Compare ROC"},
//     {id: 223, pId: 22, name: "Performance Classification"},
//     {id: 224, pId: 22, name: "Performance Cluster"},
//     {id: 225, pId: 22, name: "Performance Regression"},
//     {id: 226, pId: 22, name: "Performance ROC"},
//     {id: 23, pId: 2, name: "Import"},
//     {id: 231, pId: 23, name: "Read CSV"},
//     {id: 232, pId: 23, name: "Read Database"},
//     {id: 233, pId: 23, name: "Read Excel"},
//     {id: 234, pId: 23, name: "Read Hive"},
//     {id: 235, pId: 23, name: "Read Model"},
//     {id: 236, pId: 23, name: "Performance ROC"},
//     {id: 24, pId: 2, name: "Export"},
//     {id: 241, pId: 24, name: "Export Attributes Name"},
//     {id: 242, pId: 24, name: "Persist Hive"},
//     {id: 243, pId: 24, name: "Persist Model"},
//     {id: 244, pId: 24, name: "Write CSV"},
//     {id: 25, pId: 2, name: "Transfer"},
//     {id: 251, pId: 25, name: "Aggregate"},
//     {id: 252, pId: 25, name: "ANOVA"},
//     {id: 253, pId: 25, name: "Discretize By Binning"},
//     {id: 254, pId: 25, name: "Discretize By Size"}
// ];

router.get("/actives", function (req, res, next) {
    res.json(activeconfig);
});

router.get("/:id", function (req, res, next) {
    var activeId = req.params.id;
    console.log(req.params);
    var flag = false;
    for (idx in activeconfig) {
        var activenode = activeconfig[idx];
        if (activenode.id == activeId) {
            res.json(activenode);
            flag = true;
            break;
        }
    }
    if (!flag) {
        res.json({error: true});
    }
});

module.exports = router;