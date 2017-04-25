/**
 * Created by weiqiang on 2017/4/19.
 */
var express = require('express');
var router = express.Router();
var request = require('request');

mainurl = 'http://172.21.127.123:54323';

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
                var bodyJson = JSON.parse(body);
                res.json({
                    error: false,
                    message: {column_names: bodyJson['column_names'], column_types: bodyJson['column_types']}
                });
            } else {
                res.json({error: true, "message": "request parseSetup setup failed, " + body});
            }
        }
    );
}

router.get("/:csvname", function (req, res, next) {
    var importFilesUrl = mainurl + "/3/ImportFiles?path=" + req.params.csvname;
    console.log("continue to import file " + importFilesUrl);
    request(importFilesUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseSetup(body, res);
        } else {
            res.json({error: true, "message": "request import file failed, " + body});
        }
    });
});

module.exports = router;