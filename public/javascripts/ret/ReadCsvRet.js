/**
 * Created by weiqiang on 2017/4/27.
 */
'use strict';

class ReadCsvRet {
    constructor(ret = undefined) {
        if (ret != undefined) {
            this.setJob(ret.job);
        }
    }

    setJob(job) {
        this.job = job;
    }

    getJob() {
        return this.job;
    }
}

module.exports = ReadCsvRet;
