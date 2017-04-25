/**
 * Created by weiqiang on 2017/4/19.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
// var Rx = require('rx');
// const rxJs = new Rx.Subject();

mainurl = 'http://172.21.127.123:54323';
function parse(params, res) {
    var parseUrl = mainurl + '/3/Parse';
    var bodyJson = JSON.parse(params);
    var formdata = {
        'destination_frame': bodyJson['destination_frame'],
        'source_frames': '["' + bodyJson['source_frames'][0]['name'] + '"]',
        'parse_type': bodyJson['parse_type'],
        'separator': bodyJson['separator'],
        'number_columns': bodyJson['number_columns'],
        'single_quotes': bodyJson['single_quotes'],
        'column_names': '',
        'column_types': '',
        'check_header': bodyJson['check_header'],
        'delete_on_done': true,
        'chunk_size': bodyJson['chunk_size']
    };
    formdata['column_names'] += '[';
    for (key in bodyJson['column_names']) {
        formdata['column_names'] += '"' + bodyJson['column_names'][key] + '",';
    }
    formdata['column_names'] += ']';

    formdata['column_types'] += '[';
    for (key in bodyJson['column_types']) {
        formdata['column_types'] += '"' + bodyJson['column_types'][key] + '",';
    }
    formdata['column_types'] += ']';
    console.log("continue to parse " + parseUrl);
    request.post({
            url: parseUrl,
            form: formdata
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                parseResult = JSON.parse(body);
                job = parseResult['job'];
                jobkey = job['key'];
                jobname = jobkey['name'];
                res.json({error: false, message: jobname});
            } else {
                console.log(body);
                res.json({error: true, "message": "request parse setup failed, " + body});
            }
        }
    );
}

function parseSetup(params, res) {
    var bodyJson = JSON.parse(params);
    var parseSetupUrl = mainurl + '/3/ParseSetup';
    var formData = {
        'source_frames': '["' + bodyJson['destination_frames'] + '"]'
    };
    console.log("continue to parseSetup " + parseSetupUrl + formData.source_frames);
    request.post({
            url: parseSetupUrl,
            form: formData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                parse(body, res);
            } else {
                res.json({error: true, "message": "request parseSetup setup failed, " + body});
            }
        }
    );
}

router.post("/", function (req, res, next) {
    var reqbody = req.body;
    var importFilesUrl = mainurl + "/3/ImportFiles?path=" + reqbody.csvname;
    console.log("continue to import file " + importFilesUrl);
    request(importFilesUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseSetup(body, res);
        } else {
            res.json({error: true, "message": "request import file failed, " + body});
        }
    });
});

router.get("/:jobs", function (req, res, next) {
    var jobsUrl = mainurl + "/3/Jobs/" + req.params.jobs;
    request(jobsUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.parse(body);
            jobs = result['jobs'][0];
            progress = jobs['progress'];
            progress_msg = jobs['progress_msg'];
            // console.log(jobs);
            res.json({error: false, message: {progress: progress, progress_msg: progress_msg}});
        } else {
            res.json({error: true, "message": "request get jobs failed, " + body});
        }
    });
});

module.exports = router;