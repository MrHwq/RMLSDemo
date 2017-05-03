/**
 * Created by weiqiang on 2017/4/21.
 */
let express = require('express');
let router = express.Router();
let request = require('request');
let H2OErrorV3 = require('./watertype/errortype/H2OErrorV3');
let ModelMetricsListSchemaV3 = require('./watertype/ModelMetricsListSchemaV3');
let errorFunc = require('./actionError');

mainurl = 'http://172.21.127.123:54323';
router.post("/", function (req, res, next) {
    let params = req.body;
    let applyModelUrl = `${mainurl}/3/Predictions/models/${params.modelid}/frames/${params.datain}`;
    console.log(`continue to applymodel ${applyModelUrl}`);
    request.post({
            url: applyModelUrl,
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let metricsList = new ModelMetricsListSchemaV3(JSON.parse(body));
                res.json({error: false, message: metricsList.getMetrics()});
                return;
            }
            errorFunc(`request apply model failed, ${error}, code:${response != undefined ? response.statusCode : 0}`,
                body, res);
        }
    );
});

module.exports = router;