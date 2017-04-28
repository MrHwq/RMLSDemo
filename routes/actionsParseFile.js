/**
 * Created by weiqiang on 2017/4/19.
 */
let express = require('express');
let router = express.Router();
let request = require('request');
let ImportFiles = require('./watertype/ImportFilesV3');
let ParseSetupV3 = require('./watertype/ParseSetupV3');
let H2OErrorV3 = require('./watertype/errortype/H2OErrorV3');

mainurl = 'http://172.21.127.123:54323';

function parseSetup(importFiles, res) {
    let parseSetupUrl = mainurl + '/3/ParseSetup';
    let formData = {
        'source_frames': JSON.stringify(importFiles.getDstFrames())
    };
    console.log("continue to parseSetup " + parseSetupUrl + formData.source_frames);
    request.post({
            url: parseSetupUrl,
            form: formData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                parse = new ParseSetupV3(JSON.parse(body));
                res.json({
                    error: false,
                    message: {
                        column_names: parse.getColumnNames(),
                        column_types: parse.getColumnTypes()
                    }
                });
            } else {
                error = new H2OErrorV3(JSON.parse(body));
                res.json({error: true, "message": "request split data failed, " + error.getMsg()});
            }
        }
    );
}

router.get("/:csvname", function (req, res, next) {
    let importFilesUrl = mainurl + "/3/ImportFiles?path=" + req.params.csvname;
    console.log("continue to import file " + importFilesUrl);
    request(importFilesUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            importFiles = new ImportFiles(JSON.parse(body));
            parseSetup(importFiles, res);
        } else if (body != undefined) {
            h2oerror = new H2OErrorV3(JSON.parse(body));
            res.json({error: true, "message": "request import file failed, " + h2oerror.getMsg()});
        } else {
            res.json({error: true, "message": "request import file failed, " + response});
        }
    });
});

module.exports = router;