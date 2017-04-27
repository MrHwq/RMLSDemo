/**
 * Created by weiqiang on 2017/4/27.
 */
class JobsV3 {
    constructor(jobsV3) {
        this.jobs = jobsV3.jobs;
    }

    getJobName() {
        return this.key.name;
    }
}

module.exports = JobsV3;