/**
 * Created by weiqiang on 2017/4/26.
 */
let express = require('express');
let router = express.Router();
let request = require('request');
let H2OErrorV3 = require('./watertype/errortype/H2OErrorV3');

let JobRet = require('../public/javascripts/ret/JobRet.js');
let errorFunc = require('./actionError');

mainurl = 'http://172.21.127.123:54323';
router.get("/:jobs", function (req, res, next) {
    let jobsUrl = `${mainurl}/3/Jobs/${req.params.jobs}`;
    console.log(jobsUrl);
    request(jobsUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let result = JSON.parse(body);
            let jobs = result['jobs'][0];
            let ret = new JobRet();
            ret.setJobProcess(jobs['progress']);
            ret.setJobProcessMsg(jobs['progress_msg']);
            res.json(ret);
            return;
        }
        errorFunc(`request get jobs failed, ${error}, code:${response != undefined ? response.statusCode : 0}`,
            body, res);
    });
});

router.get("/", function (req, res, next) {
    res.send('baby come here');
});

module.exports = router;