/**
 * Created by weiqiang on 2017/4/27.
 */
import ModelKeyV3 from "./ModelKeyV3";
import FrameKeyV3 from "./FrameKeyV3";

class ModelMetricsListSchemaV3 {
    constructor(schema) {
        this.model = new ModelKeyV3(schema.model);
        this.frame = new FrameKeyV3(schema.frame);
        this.predictions_frame = new FrameKeyV3(schema.predictions_frame);
    }
}

module.exports = ModelMetricsListSchemaV3;