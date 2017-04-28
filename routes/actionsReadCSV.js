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
// var Rx = require('rx');
// const rxJs = new Rx.Subject();

mainurl = 'http://172.21.127.123:54323';
function parseFunc(parseSetup, res) {
    let parseUrl = `${mainurl}/3/Parse`;
    let formdata = {
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
            form: formdata
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                parseRet = new ParseV3(JSON.parse(body));
                res.json({error: false, message: parseRet.getJob().getJobName()});
            } else if (body != undefined) {
                h2oerror = new H2OErrorV3(JSON.parse(body));
                res.json({error: true, "message": `request parse failed, ${h2oerror.getMsg()}`});
            } else {
                res.json({error: true, "message": `request parse failed, ${response}`});
            }
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
                parseresult = new ParseSetupV3(JSON.parse(body));
                if (importFiles.getColumnTypes() != undefined) {
                    parseresult.setColumnTypes(importFiles.getColumnTypes());
                }
                parseFunc(parseresult, res);
            } else if (body != undefined) {
                h2oerror = new H2OErrorV3(JSON.parse(body));
                res.json({error: true, "message": `parse setup failed, ${h2oerror.getMsg()}`});
            } else {
                res.json({error: true, "message": `parse setup failed, ${response}`});
            }
        }
    );
}

router.post("/", function (req, res, next) {
    let reqbody = req.body;
    let importFilesUrl = `${mainurl}/3/ImportFiles?path=${reqbody.csvname}`;
    console.log(`continue to import file ${importFilesUrl}`);
    console.log(req.body);
    request(importFilesUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            importFiles = new ImportFiles(JSON.parse(body));
            if (reqbody.column_types != undefined) {
                importFiles.setColumnTypes(reqbody.column_types);
            }
            parseSetup(importFiles, res);
        } else if (body != undefined) {
            h2oerror = new H2OErrorV3(JSON.parse(body));
            res.json({error: true, "message": `request import file failed, ${h2oerror.getMsg()}`});
        } else {
            res.json({error: true, "message": `request import file failed, ${response}`});
        }
    });
});

module.exports = router;