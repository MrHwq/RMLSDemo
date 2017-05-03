/**
 * Created by weiqiang on 2017/4/27.
 */
'use strict';

class JobRet {
    constructor(ret = undefined) {
        if (ret != undefined) {
            this.setJobProcess(ret.progress);
            this.setJobProcessMsg(ret.progressMsg);
        }
    }

    setJobProcess(progress) {
        this.progress = progress;
    }

    GetJobProcess() {
        return this.progress;
    }

    setJobProcessMsg(progressMsg) {
        this.progressMsg = progressMsg;
    }

    GetJobProcessMsg() {
        return this.progressMsg;
    }
}

module.exports = JobRet;
