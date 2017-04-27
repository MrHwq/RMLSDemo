/**
 * Created by weiqiang on 2017/4/21.
 */

var express = require('express');
var router = express.Router();
var request = require('request');
var RapidNumberV3 = require('./watertype/RapidsNumberV3');
var H2OErrorV3 = require('./watertype/errortype/H2OErrorV3');

//splitparams is like {destination_frame: frame, percentrate: [rate], frame: [ ], seed: random_seed}
router.post("/", function (req, res, next) {
    var params = req.body;
    // res.json({error: false, 'rolename': rolename});
    tmpflow = 'flow_' + new Date().getTime();
    astString = '(, (tmp= ' + tmpflow + ' (h2o.runif ' + params.hexname + ' ' + params.seed + ')) (assign ' + params.frame[0] +
        ' (rows ' + params.hexname + ' (<= ' + tmpflow + ' ' + params.percentrate[0] + '))) (assign ' + params.frame[1] + ' (rows ' + params.hexname
        + ' (> ' + tmpflow + ' ' + (1 - params.percentrate[0]) + '))) (rm ' + tmpflow + '))';
    var parseUrl = mainurl + '/99/Rapids';
    console.log("continue to splitparams " + parseUrl + '/' + astString);
    request.post({
            url: parseUrl,
            form: {
                'ast': astString
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                rapids = new RapidNumberV3(JSON.parse(body));
                res.json({error: false, message: {ast: rapids.getAst()}});
            } else if (body != undefined) {
                h2oerror = new H2OErrorV3(JSON.parse(body));
                res.json({error: true, "message": "request split data failed, " + h2oerror.getMsg()});
            } else {
                res.json({error: true, "message": "request split data failed, " + response});
            }
        }
    );
});

module.exports = router;