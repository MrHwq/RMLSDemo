/**
 * Created by weiqiang on 2017/4/27.
 */
'use strict';

class ApplyModelRet {
    constructor(ret = undefined) {
        if (ret != undefined) {
            this.SetMetrics(ret.metrics);
        }
    }

    SetMetrics(metrics) {
        this.metrics = metrics;
    }

    getMetrics() {
        return this.metrics;
    }
}

module.exports = ApplyModelRet;
