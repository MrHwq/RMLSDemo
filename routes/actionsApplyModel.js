/**
 * Created by weiqiang on 2017/4/21.
 */
let express = require('express');
let router = express.Router();
let request = require('request');
let RapidNumberV3 = require('./watertype/RapidsNumberV3');
let H2OErrorV3 = require('./watertype/errortype/H2OErrorV3');
let ModelMetricsListSchemaV3 = require('./watertype/ModelMetricsListSchemaV3');

mainurl = 'http://172.21.127.123:54323';
router.post("/", function (req, res, next) {
    let params = req.body;
    let applymodelUrl = `${mainurl}/3/Predictions/models/${params.modelid}/frames/${params.datain}`;
    console.log(`continue to applymodel ${applymodelUrl}`);
    request.post({
            url: applymodelUrl,
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                let metricsList = new ModelMetricsListSchemaV3(JSON.parse(body));
                res.json({error: false, message: metricsList.getMetrics()});
            } else if (body != undefined) {
                h2oerror = new H2OErrorV3(JSON.parse(body));
                res.json({error: true, "message": `request apply model failed, ${h2oerror.getMsg()}`});
            } else {
                res.json({error: true, "message": `request apply model failed, ${response}`});
            }
        }
    );
});

module.exports = router;