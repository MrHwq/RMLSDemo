/**
 * Created by weiqiang on 2017/4/21.
 */

let express = require('express');
let router = express.Router();
let request = require('request');
let RapidNumberV3 = require('./watertype/RapidsNumberV3');
let H2OErrorV3 = require('./watertype/errortype/H2OErrorV3');
let errorFunc = require('./actionError');
let splitdatabypercentret = require('../public/javascripts/ret/SplitDataByPercentRet.js');
let errorret = require('../public/javascripts/ret/ErrorRet.js');

//splitparams is like {destination_frame: frame, percentrate: [rate], frame: [ ], seed: random_seed}
router.post("/", function (req, res, next) {
    let params = req.body;
    let tmpFlow = `flow_${new Date().getTime()}`;
    let astString = `(, (tmp= ${tmpFlow} (h2o.runif ${params.hexname} ${params.seed})) (assign ${params.frame[0]} (rows ${params.hexname} (<= ${tmpFlow} ${params.percentrate[0]}))) (assign ${params.frame[1]} (rows ${params.hexname} (> ${tmpFlow} ${(1 - params.percentrate[0])}))) (rm ${tmpFlow}))`;
    let parseUrl = `${mainurl}/99/Rapids`;
    console.log(`continue to splitparams ${parseUrl} / ${astString}`);
    request.post({
            url: parseUrl,
            form: {
                'ast': astString
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                rapids = new RapidNumberV3(JSON.parse(body));
                let ret = new splitdatabypercentret();
                ret.setAst(rapids.getAst());
                res.json(ret);
                return;
            }

            errorFunc(`request split data failed, ${error}, code:${response != undefined ? response.statusCode : 0}`,
                body, res);
        }
    );
});

module.exports = router;