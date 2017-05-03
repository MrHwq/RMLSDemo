/**
 * Created by weiqiang on 2017/4/27.
 */
// import ModelKeyV3 from "./ModelKeyV3";
// import FrameKeyV3 from "./FrameKeyV3";
'use strict';
/*
 * {__meta:{schema_version:3,schema_name:ModelMetricsListSchemaV3,schema_type:ModelMetricsList},
 * _exclude_fields:,
 * model: ModelKeyV3,
 *
 * frame:FrameKeyV3,
 *
 * predictions_frame:FrameKeyV3,
 *
 * deviances_frame:null,
 * model_metrics:[ModelMetricsBinomialV3]}
 */
let ModelMetricsBinomialV3 = require("./ModelMetricsBinomialV3");

class ModelMetricsListSchemaV3 {
    constructor(schema) {
        let meta = schema.__meta;
        if (meta.schema_name != 'ModelMetricsListSchemaV3') {
            console.error(metrics);
        }
        this.metrics = new ModelMetricsBinomialV3(schema.model_metrics[0]);
        // this.model = new ModelKeyV3(schema.model);
        // this.frame = new FrameKeyV3(schema.frame);
        // this.predictions_frame = new FrameKeyV3(schema.predictions_frame);
    }

    getMetrics() {
        return this.metrics;
    }
}

module.exports = ModelMetricsListSchemaV3;