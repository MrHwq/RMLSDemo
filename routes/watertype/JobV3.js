/**
 * Created by weiqiang on 2017/4/27.
 */
/*
 * job:{__meta:{schema_version:3,schema_name:JobV3,schema_type:Job},
 *     key:{__meta:{schema_version:3,schema_name:JobKeyV3,schema_type:Key<Job>},
 *         name:$0300ffffffff$_8488829163c7c8aea8bdefdec4854dbf,
 *         type:Key<Job>,
 *         URL:/3/Jobs/$0300ffffffff$_8488829163c7c8aea8bdefdec4854dbf},
 *     description:SVM,
 *     status:RUNNING,
 *     progress:0.0,
 *     progress_msg:null,start_time:1493192273497,msec:2,
 *     dest:{__meta:{schema_version:3,schema_name:ModelKeyV3,schema_type:Key<Model>},
 *          name:SVM_81064_64294_13097,type:Key<Model>,
 *          URL:/3/Models/SVM_81064_64294_13097
 *     },
 *     warnings:null,exception:null,stacktrace:null,ready_for_view:true
 * },
 */
class JobV3 {
    constructor(job) {
        if (job != undefined) {
            this.key = job.key;
            this.status = job.status;
            this.progress = job.progress;
            this.progress_msg = job.progress_msg;
            this.dest = job.dest;
        }
    }

    getJobName() {
        return this.key != undefined ? this.key.name : "undefined";
    }

    getJobUrl() {
        return this.key != undefined ? this.key.URL : "undefined";
    }

    getJobStatus() {
        return this.status;
    }

    getJobProgress() {
        return this.progress;
    }

    getJobProgressMsg() {
        return this.progress_msg;
    }

    toString() {
        return 'JobName:' + this.getJobName() + ',JobStatus:' + this.getJobStatus();
    }
}

module.exports = JobV3;