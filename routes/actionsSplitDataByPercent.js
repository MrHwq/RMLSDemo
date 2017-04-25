/**
 * Created by weiqiang on 2017/4/21.
 */

var express = require('express');
var router = express.Router();
var request = require('request');

//splitparams is like {destination_frame: frame, percentrate: [rate], frame: [ ], seed: random_seed}
router.post("/", function (req, res, next) {
    var params = req.body;
    console.log(params);
    // res.json({error: false, 'rolename': rolename});
    tmpflow = 'flow_' + new Date().getTime();
    astString = '(, (tmp= ' + tmpflow + ' (h2o.runif ' + params.hexname + ' ' + params.seed + ')) (assign ' + params.frame[0] +
        ' (rows ' + params.hexname + ' (<= ' + tmpflow + ' ' + params.percentrate[0] + '))) (assign ' + params.frame[1] + ' (rows ' + params.hexname
        + ' (> ' + tmpflow + ' ' + (1 - params.percentrate[0]) + '))) (rm ' + tmpflow + '))';
    console.log(astString);
    //
    var parseUrl = mainurl + '/99/Rapids';
    // var bodyJson = JSON.parse(params);
    //
    console.log("continue to splitparams " + parseUrl);
    return;
    request.post({
            url: parseUrl,
            form: {
                'ast': astString
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                parseResult = JSON.parse(body);
                meta = parseResult['__meta'];
                if (!(meta['schema_name'] == 'RapidsNumberV3')) {
                    console.log("WTF in splitdatabypercent");
                }
                // jobkey = job['key'];
                // jobname = jobkey['name'];
                //"{"__meta":{"schema_version":3,"schema_name":"RapidsNumberV3","schema_type":"Iced"},
                // "_exclude_fields":"",
                // "ast":null,
                // "session_id":null,
                // "id":null,
                // "scalar":1.0}"
                res.json({error: false, message: {ast: parseResult['ast']}});
            } else {
                parseResult = JSON.parse(body);
                meta = parseResult['__meta'];
                schema_name = meta['schema_name'];
                schema_type = meta['schema_type'];
                msg = meta['msg'];
                console.log('error name:' + schema_name + ",type:" + schema_type);
                console.log(body);
                res.json({error: true, "message": "request split data failed, " + msg});
            }
        }
    );
});

module.exports = router;