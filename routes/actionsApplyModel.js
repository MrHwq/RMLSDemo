/**
 * Created by weiqiang on 2017/4/21.
 */

var express = require('express');
var router = express.Router();
var request = require('request');
var RapidNumberV3 = require('./watertype/RapidsNumberV3');
var H2OErrorV3 = require('./watertype/errortype/H2OErrorV3');

mainurl = 'http://172.21.127.123:54323';
router.post("/", function (req, res, next) {
    var params = req.body;
    // res.json({error: false, 'rolename': rolename});

    var applymodelUrl = mainurl + '/3/Predictions/models/' + params.modelid + '/frames/' + params.datain;
    console.log("continue to applymodel " + applymodelUrl);
    request.post({
            url: applymodelUrl,
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                rapids = new RapidNumberV3(JSON.parse(body));
                res.json({error: false, message: {ast: rapids.getAst()}});
            } else if (body != undefined) {
                h2oerror = new H2OErrorV3(JSON.parse(body));
                res.json({error: true, "message": "request apply model failed, " + h2oerror.getMsg()});
            } else {
                res.json({error: true, "message": "request apply model failed, " + response});
            }
        }
    );
});

module.exports = router;