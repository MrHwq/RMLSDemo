/**
 * Created by weiqiang on 2017/4/21.
 */

var express = require('express');
var router = express.Router();
var request = require('request');
var SVMV3 = require('./watertype/SVMV3');
var H2OErrorV3 = require('./watertype/errortype/H2OErrorV3');

mainurl = 'http://172.21.127.123:54323';
var buildModel = function (formData, res) {
    var modelBuilders = mainurl + '/3/ModelBuilders/svm';
    console.log("continue to buildModel " + formData.model_id);
    request.post({
            url: modelBuilders,
            form: formData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                svm = new SVMV3(JSON.parse(body));
                job = svm.getJob();
                res.json({
                    error: false,
                    message: {
                        jobname: job.getJobName(),
                        jobstatus: job.getJobStatus(),
                        joburl: job.getJobUrl()
                    }
                });
            } else if (body != undefined) {
                h2oerror = new H2OErrorV3(JSON.parse(body));
                console.log(body);
                res.json({error: true, "message": "request svm failed, " + h2oerror.getStackTrace()});
            } else {
                res.json({error: true, "message": "request svm failed, " + response});
            }
        }
    );
}

router.post("/", function (req, res, next) {
    var modelBuilders = mainurl + '/3/ModelBuilders/svm/parameters';
    var params = req.body;
    console.log(req.body);
    var formData = {
        'model_id': params.model_id,
        'nfolds': params.nfolds,
        'ignore_const_cols': params.ignore_const_cols,
        'add_intercept': params.add_intercept,
        'step_size': params.step_size,
        'reg_param': params.reg_param,
        'convergence_tol': params.convergence_tol,
        'mini_batch_fraction': params.mini_batch_fraction,
        'threshold': params.threshold,
        'updater': params.updater,
        'gradient': params.gradient,
        'missing_values_handling': params.missing_values_handling
    };
    console.log("continue to modelBuilders " + params.model_id);
    request.post({
            url: modelBuilders,
            form: formData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                svm = new SVMV3(JSON.parse(body));
                console.log('modelBuilders:' + svm.getJob().toString());
                buildModelInfo = {
                    'model_id': params.model_id,
                    'training_frame': params.hexname,
                    'response_column': params.response_column,
                    'nfolds': params.nfolds,
                    'ignore_const_cols': params.ignore_const_cols,
                    'add_intercept': params.add_intercept,
                    'step_size': params.step_size,
                    'reg_param': params.reg_param,
                    'convergence_tol': params.convergence_tol,
                    'mini_batch_fraction': params.mini_batch_fraction,
                    'threshold': params.threshold,
                    'updater': params.updater,
                    'gradient': params.gradient,
                    'missing_values_handling': params.missing_values_handling
                }
                buildModel(buildModelInfo, res);
            } else if (body != undefined) {
                h2oerror = new H2OErrorV3(JSON.parse(body));
                res.json({error: true, "message": "request svm register failed, " + h2oerror.getMsg()});
            } else {
                res.json({error: true, "message": "request svm register failed, " + response});
            }
        }
    );
})

module.exports = router;