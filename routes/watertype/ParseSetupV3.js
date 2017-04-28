/**
 * Created by weiqiang on 2017/4/27.
 */
/*
 {__meta:{schema_version:3,schema_name:ParseSetupV3,schema_type:ParseSetup},
 _exclude_fields:,
 source_frames:[
 {__meta:{schema_version:3,schema_name:FrameKeyV3,schema_type:Key<Frame>},
 name:nfs://root/hwq/data/rfid_train20170223.csv,
 type:Key<Frame>,
 URL:/3/Frames/nfs://root/hwq/data/rfid_train20170223.csv}],

 parse_type:CSV,
 separator:44,
 single_quotes:false,
 check_header:1,
 column_names:[EPC,Time,Rssi,PhaseRadian,label,Velocity,tag_readrate,Frequency,Rssi_mavg,Rssi_median,Rssi_mstd,Phase_mavg,Phase_mstd,CFPR_sum,CFPR_mstd,CFPR_median,Slide_Window,freqChange],
 column_types:[Enum,String,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric,Numeric],
 na_strings:null,
 column_name_filter:null,
 column_offset:0,
 column_count:0,
 destination_frame:rfid_train201702238.hex,
 header_lines:0,
 number_columns:18,
 data:[[0017 0001 0169,2017-02-22-15:44:12.539493,-61.5,3.6999616604,0,0.009933127312194,15.6730848844874,920.875,-61.2,-61,0.199,3.605,0.473,0.557,0.693,0.086,11,0],
 [0017 0001 0169,2017-02-22-15:44:12.625498,-62.5,3.4667965806,0,0.010401677141877,13.8161358996576,920.875,-61,-61,0.21,3.597,0.477,0.547,0.693,0.086,11,0],
 [0017 0001 0169,2017-02-22-15:44:12.708503,-60.5,3.5526995047,0,0.196125341203179,15.3965395403525,920.875,-61,-61,0.213,3.6,0.477,0.534,0.692,0.037,11,0],
 [0017 0001 0169,2017-02-22-15:44:12.763506,-61,3.7490490456,0,0.078753991537643,15.4588390916289,920.875,-60.9,-61,0.22,3.575,0.485,0.533,0.68,0.025,11,0],
 [0017 0001 0169,2017-02-22-15:44:12.820509,-60,2.1107575641,0,0.020109244973622,14.7108884987013,920.875,-61,-61,0.217,3.549,0.495,0.513,0.649,0.025,11,0],
 [0017 0001 0169,2017-02-22-15:44:12.870512,-61,3.6692820446,0,-0.043506956425665,15.5997320902011,920.875,-60.7,-61,0.212,3.542,0.498,0.57,0.612,0.025,11,0],
 [0017 0001 0169,2017-02-22-15:44:12.942516,-59,4.3196898987,0,-0.076628934880486,15.558882457842,920.875,-60.8,-61,0.209,3.592,0.494,0.562,0.637,0.025,11,0],
 [0017 0001 0169,2017-02-22-15:44:13.081524,-61,3.724505353,0,-0.050631827529804,12.9675583748148,920.875,-60.8,-61,0.209,3.65,0.525,0.561,0.687,-0.074,11,0],
 [0017 0001 0169,2017-02-22-15:44:13.093525,-60.5,3.644738352,0,-0.008350023273964,15.4223607158185,920.875,-60.9,-61,0.208,3.694,0.533,0.579,0.686,-0.08,11,0]],
 warnings:null,chunk_size:11671040,total_filtered_column_count:18}
 */
class ParseSetupV3 {
    constructor(parse) {
        this.dstFrame = parse.destination_frame;
        this.srcFrames = parse.source_frames;
        this.parseType = parse.parse_type;
        this.separator = parse.separator;
        this.number_columns = parse.number_columns;
        this.single_quotes = parse.single_quotes;
        this.check_header = parse.check_header;
        this.delete_on_done = true;
        this.chunk_size = parse.chunk_size;
        this.column_names = parse.column_names;
        this.column_types = parse.column_types;

        // console.log(JSON.stringify(parse['column_names']));
        // console.log(JSON.stringify(parse.column_types));
        // for (var key in parse.column_names) {
        //     this.column_names += '"' + parse['column_names'][key] + '",';
        // }
        // this.column_names += ']';
        // this.column_types = '[';
        // for (var key in parse.column_types) {
        //     this.column_types += '"' + parse['column_types'][key] + '",';
        // }
        // this.column_types += ']';
    }

    getDstFrame() {
        return this.dstFrame;
    }

    getSrcFramesName() {
        return this.srcFrames[0]['name'];
    }

    getParseType() {
        return this.parseType;
    }

    getSeparator() {
        return this.separator;
    }

    getNumberColumns() {
        return this.number_columns;
    }

    getSingleQuotes() {
        return this.single_quotes;
    }

    getCheckHeader() {
        return this.check_header;
    }

    getDelOnDone() {
        return this.delete_on_done;
    }

    getChunkSize() {
        return this.chunk_size;
    }

    getColumnNames() {
        return this.column_names;
    }

    getColumnTypes() {
        return this.column_types;
    }

    setColumnTypes(column_types) {
        this.column_types = column_types;
    }
}

module.exports = ParseSetupV3;