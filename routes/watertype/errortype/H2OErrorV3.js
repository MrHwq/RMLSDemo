/**
 * Created by weiqiang on 2017/4/27.
 */

/*
 {__meta:{schema_version:3,schema_name:H2OErrorV3,schema_type:H2OError},
 timestamp:1493026062478,
 error_url:/99/Rapids,
 msg:\n\nERROR MESSAGE:\n\nSyntax error: illegal Rapids expression `ast=(, (tmp= flow_1493026117845 (h2o.runif rfid_train20170223.hex 178222)) (assign rfid_train20170223.hex_0.5 (rows rfid_train20170223.hex (<= flow_1493026117845 0.5))) (assign rfid_train20170223.hex_0.51 (rows rfid_train20170223.hex (> flow_1493026117845 0.5))) (rm flow_1493026117845))`\n\n,

 dev_msg:\n\nERROR MESSAGE:\n\nSyntax error: illegal Rapids expression `ast=(, (tmp= flow_1493026117845 (h2o.runif rfid_train20170223.hex 178222)) (assign rfid_train20170223.hex_0.5 (rows rfid_train20170223.hex (<= flow_1493026117845 0.5))) (assign rfid_train20170223.hex_0.51 (rows rfid_train20170223.hex (> flow_1493026117845 0.5))) (rm flow_1493026117845))`\n\n,
 http_status:400,
 values:{},
 */
class H2OErrorV3 {
    constructor(h2oerror) {
        var meta = h2oerror.__meta;
        if (meta.schema_name != 'H2OErrorV3') {
            console.error(h2oerror);
        }
        this.error_url = h2oerror.error_url;
        this.msg = h2oerror.msg;
        this.dev_msg = h2oerror.dev_msg;
        this.exception_type = h2oerror.exception_type;
        this.exception_msg = h2oerror.exception_msg;
        this.stacktrace = h2oerror.stacktrace;
    }

    getErrorUrl() {
        return this.error_url;
    }

    getMsg() {
        return this.msg;
    }

    getDevMsg() {
        return this.dev_msg;
    }

    getExceptionType() {
        return this.exception_type;
    }

    getExceptionMsg() {
        return this.exception_msg;
    }

    getStackTrace() {
        return this.stacktrace;
    }
}

module.exports = H2OErrorV3;