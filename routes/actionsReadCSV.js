/**
 * Created by weiqiang on 2017/4/19.
 */
let express = require('express');
let router = express.Router();
let request = require('request');
let ImportFiles = require('./watertype/ImportFilesV3');
let ParseV3 = require('./watertype/ParseV3');
let ParseSetupV3 = require('./watertype/ParseSetupV3');
let H2OErrorV3 = require('./watertype/errortype/H2OErrorV3');
let errorFunc = require('./actionError');
let ReadCsvRet = require('../public/javascripts/ret/ReadCsvRet.js');
let ErrorRet = require('../public/javascripts/ret/ErrorRet.js');
// var Rx = require('rx');
// const rxJs = new Rx.Subject();

mainurl = 'http://172.21.127.123:54323';
function parseFunc(parseSetup, res) {
    let parseUrl = `${mainurl}/3/Parse`;
    let formData = {
        'destination_frame': parseSetup.getDstFrame(),
        'source_frames': `["${parseSetup.getSrcFramesName()}"]`,
        'parse_type': parseSetup.getParseType(),
        'separator': parseSetup.getSeparator(),
        'number_columns': parseSetup.getNumberColumns(),
        'single_quotes': parseSetup.getSingleQuotes(),
        'column_names': JSON.stringify(parseSetup.getColumnNames()),
        'column_types': JSON.stringify(parseSetup.getColumnTypes()),
        'check_header': parseSetup.getCheckHeader(),
        'delete_on_done': parseSetup.getDelOnDone(),
        'chunk_size': parseSetup.getChunkSize()
    };
    console.log(`continue to parse ${parseUrl}`);
    request.post({
            url: parseUrl,
            form: formData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let parseRet = new ParseV3(JSON.parse(body));
                let ret = new ReadCsvRet();
                ret.setJob(parseRet.getJob().getJobName());
                res.json(ret);
                return;
            }
            errorFunc(`request parse failed, ${error}, code:${response != undefined ? response.statusCode : 0}`, body, res);
        }
    );
}

function parseSetup(importFiles, res) {
    let parseSetupUrl = `${mainurl}/3/ParseSetup`;
    let formData = {
        'source_frames': JSON.stringify(importFiles.getDstFrames())
    };
    console.log(`continue to parseSetup ${parseSetupUrl} src:${formData.source_frames}`);
    request.post({
            url: parseSetupUrl,
            form: formData
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let parseResult = new ParseSetupV3(JSON.parse(body));
                if (importFiles.getColumnTypes() != undefined) {
                    parseResult.setColumnTypes(importFiles.getColumnTypes());
                }
                parseFunc(parseResult, res);
                return;
            }
            errorFunc(`request parse setup failed, ${error}, code:${response != undefined ? response.statusCode : 0}`,
                body, res);
        }
    );
}

router.post("/", function (req, res, next) {
    let reqbody = req.body;
    let importFilesUrl = `${mainurl}/3/ImportFiles?path=${reqbody.csvname}`;
    console.log(`continue to import file ${importFilesUrl} ${reqbody.column_types}`);
    request(importFilesUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let importFiles = new ImportFiles(JSON.parse(body));
            if (reqbody.column_types != undefined) {
                importFiles.setColumnTypes(reqbody.column_types);
            }
            parseSetup(importFiles, res);
            return;
        }
        errorFunc(`request import file failed, ${error}, code:${response != undefined ? response.statusCode : 0}`, body, res);
    });
});

module.exports = router;