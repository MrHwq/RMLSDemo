/**
 * Created by weiqiang on 2017/4/19.
 */
let express = require('express');
let router = express.Router();
let request = require('request');
let ImportFiles = require('./watertype/ImportFilesV3');
let ParseSetupV3 = require('./watertype/ParseSetupV3');
let H2OErrorV3 = require('./watertype/errortype/H2OErrorV3');
let ParseFileRet = require('../public/javascripts/ret/ParseFileRet.js');
let ErrorRet = require('../public/javascripts/ret/ErrorRet.js');
let errorFunc = require('./actionError');

mainurl = 'http://172.21.127.123:54323';

function parseSetup(importFiles, res) {
    let parseSetupUrl = `${mainurl}/3/ParseSetup`;
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
                let ret = new ParseFileRet();
                ret.setColumnNames(parse.getColumnNames());
                ret.setColumnTypes(parse.getColumnTypes());
                res.json(ret);
                return;
            }
            errorFunc(`request parse setup failed, ${error}, code:${response != undefined ? response.statusCode : 0}`,
                body, res);
        }
    );
}

router.get("/:csvname", function (req, res, next) {
    let importFilesUrl = `${mainurl}/3/ImportFiles?path=${req.params.csvname}`;
    console.log(`continue to import file ${importFilesUrl}`);
    request(importFilesUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let importFiles = new ImportFiles(JSON.parse(body));
            parseSetup(importFiles, res);
            return;
        }
        errorFunc(`request import file failed, ${error}, code:${response != undefined ? response.statusCode : 0}`,
            body, res);
    });
});


module.exports = router;