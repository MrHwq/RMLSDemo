/**
 * Created by weiqiang on 2017/4/26.
 */
let express = require('express');
let router = express.Router();
let request = require('request');
let H2OErrorV3 = require('./watertype/errortype/H2OErrorV3');

mainurl = 'http://172.21.127.123:54323';
router.get("/:jobs", function (req, res, next) {
    let jobsUrl = mainurl + "/3/Jobs/" + req.params.jobs;
    request(jobsUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.parse(body);
            jobs = result['jobs'][0];
            progress = jobs['progress'];
            progress_msg = jobs['progress_msg'];
            // console.log(jobs);
            res.json({error: false, message: {progress: progress, progress_msg: progress_msg}});
        } else if (body != undefined) {
            h2oerror = new H2OErrorV3(JSON.parse(body));
            res.json({error: true, "message": "request get jobs failed, " + h2oerror.getMsg()});
        } else {
            res.json({error: true, "message": "request get jobs failed, " + response});
        }
    });
});

module.exports = router;