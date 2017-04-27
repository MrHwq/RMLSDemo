/**
 * Created by weiqiang on 2017/4/27.
 */
/*
 * {__meta:{schema_version:3,schema_name:ParseV3,schema_type:Iced},
 *  _exclude_fields:,
 *  destination_frame:{
 *      __meta:{schema_version:3,schema_name:FrameKeyV3,schema_type:Key<Frame>},
 *      name:rfid_train20170223.hex,
 *      type:Key<Frame>,
 *      URL:/3/Frames/rfid_train20170223.hex},
 *  source_frames:[
 *      {__meta:{schema_version:3,schema_name:FrameKeyV3,schema_type:Key<Frame>},
 *      name:nfs://root/hwq/data/rfid_train20170223.csv,
 *      type:Key<Frame>,
 *      URL:/3/Frames/nfs://root/hwq/data/rfid_train20170223.csv}],
 *  parse_type:CSV,
 *  separator:44,
 *  single_quotes:false,
 *  check_header:1,
 *  number_columns:18,
 *  column_names:[EPC,Time,Rssi,PhaseRadian,label,Velocity,tag_readrate,Frequency,Rssi_mavg,Rssi_median,Rssi_mstd,Phase_mavg,Phase_mstd,CFPR_sum,CFPR_mstd,CFPR_median,Slide_Window,freqChange],
 *  column_types:[Enum,String,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric],
 *  domains:null,
 *  na_strings:null,
 *  chunk_size:11671040,
 *  delete_on_done:true,
 *  blocking:false,
 *  job:{__meta:{schema_version:3,schema_name:JobV3,schema_type:Job},
 *      key:{__meta:{schema_version:3,schema_name:JobKeyV3,schema_type:Key<Job>},
 *      name:$0300ffffffff$_90b3dc4e9f3cc9beaa3506dc812f4169,
 *      type:Key<Job>,
 *      URL:/3/Jobs/$0300ffffffff$_90b3dc4e9f3cc9beaa3506dc812f4169},
 *      description:Parse,
 *      status:RUNNING,
 *      progress:0.0,
 *      progress_msg:null,
 *      start_time:1493258509851,
 *      msec:50,
 *      dest:{__meta:{schema_version:3,schema_name:FrameKeyV3,schema_type:Key<Frame>},
 *          name:rfid_train20170223.hex,
 *          type:Key<Frame>,
 *          URL:/3/Frames/rfid_train20170223.hex},
 *      warnings:null,
 *      exception:null,
 *      stacktrace:null,
 *      ready_for_view:true },
 *  rows:0
 *  }
 */
var JobV3 = require('./JobV3');
class ParseV3 {
    constructor(parse) {
        this.job = new JobV3(parse.job);
    }

    getJob() {
        return this.job;
    }
}

module.exports = ParseV3;