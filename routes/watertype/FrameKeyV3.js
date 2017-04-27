/**
 * Created by weiqiang on 2017/4/27.
 */
/*
 * {__meta:{schema_version:3,schema_name:FrameKeyV3,schema_type:Key<Frame>},
 * name:czc.hex_0.75,
 * type:Key<Frame>,
 * URL:/3/Frames/czc.hex_0.75}
 */
class FrameKeyV3 {
    constructor(frame) {
        var meta = frame.__meta;
        if (meta.schema_name != 'FrameKeyV3') {
            console.error(frame);
        }
        this.name = frame.name;
        this.type = frame.type;
        this.URL = frame.URL;
    }
}

module.exports = FrameKeyV3;