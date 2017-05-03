/**
 * Created by weiqiang on 2017/4/27.
 */
'use strict';

class SplitDataByPercentRet {
    constructor(ret = undefined) {
        if (ret != undefined) {
            this.setAst(ret.ast);
        }
    }

    setAst(ast) {
        this.ast = ast;
    }

    getAst() {
        return this.ast;
    }
}

module.exports = SplitDataByPercentRet;
