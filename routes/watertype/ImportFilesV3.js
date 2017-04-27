/**
 * Created by weiqiang on 2017/4/27.
 */
'use strict';
/**
 * {__meta:{schema_version:3,schema_name:ImportFilesV3,schema_type:ImportFiles},
 * _exclude_fields:,
 * path:/root/hwq/data/rfid_train20170223.csv,
 * pattern:null,
 * files:[/root/hwq/data/rfid_train20170223.csv],
 * destination_frames:[nfs://root/hwq/data/rfid_train20170223.csv],
 * fails:[],
 * dels:[nfs://root/hwq/data/rfid_train20170223.csv]}
 */
class ImportFilesV3 {
    constructor(importfile) {
        this.path = importfile.path;
        this.files = importfile.files;
        this.destination_frames = importfile.destination_frames;
    }

    getDstFrames() {
        return this.destination_frames;
    }
}

module.exports = ImportFilesV3;