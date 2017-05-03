/**
 * Created by weiqiang on 2017/5/3.
 */

let H2OErrorV3 = require('./watertype/errortype/H2OErrorV3');
let ErrorRet = require('../public/javascripts/ret/ErrorRet.js');

function errorFunc(message, body, res) {
    "use strict";
    let ret = new ErrorRet();
    ret.setMessage(message);
    if (body != undefined) {
        let h2oError = new H2OErrorV3(JSON.parse(body));
        ret.setExceptionMsg(h2oError.getMsg());
        ret.setExceptionType(h2oError.getExceptionType());
        ret.setStackTrace(h2oError.getStackTrace());
    }
    res.status(500);
    res.json(ret);
}

module.exports = errorFunc;
