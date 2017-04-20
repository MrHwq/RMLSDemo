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
        'column_names': '["' + bodyJson['column_names'] + '"]',
        'column_types': '["' + bodyJson['column_types'] + '"]',
        'check_header': bodyJson['check_header'],
        'delete_on_done': true,
        'chunk_size': bodyJson['chunk_size']
    };
    console.log(formdata);
    console.log("continue to parse " + parseUrl);
    request.post({
            url: parseUrl,
            formData: JSON.stringify(formdata)
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.json({error: false, message: body});
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
    console.log("continue to parseSetup " + parseSetupUrl);
    console.log(formData);
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
    )
    ;
}
router.post("/readcsv", function (req, res, next) {
    var reqbody = req.body;
    var importFilesUrl = mainurl + "/3/ImportFiles?path=" + reqbody.csvname;
    request(importFilesUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseSetup(body, res);
        } else {
            res.json({error: true, "message": "request import file failed, " + body});
        }
    });

});

router.get("/setrole/:rolename", function (req, res, next) {
    var rolename = req.params.rolename;
    res.json({error: false, 'rolename': rolename});
})

module.exports = router;