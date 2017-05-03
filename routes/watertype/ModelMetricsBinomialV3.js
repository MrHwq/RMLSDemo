/**
 * Created by weiqiang on 2017/4/27.
 */
/*
 * {
 *    __meta:{schema_version:3,schema_name:ModelMetricsBinomialV3,schema_type:ModelMetricsBinomial},
 *    model:{__meta:{schema_version:3,schema_name:ModelKeyV3,schema_type:Key<Model>},
 *            name:SVM_25587_24813_30510,
 *            type:Key<Model>,
 *            URL:/3/Models/SVM_25587_24813_30510},
 *    model_checksum:985807837880986704,
 *    frame_checksum:-1840511726189407120,
 *    description:null,
 *    model_category:Binomial,
 *    scoring_time:1493282561018,
 *    MSE:1547987.6783143128,
 *    RMSE:1244.1815294860767,
 *    nobs:63,
 *    r2:-8170162.690464772,
 *    logloss:NaN,
 *    AUC:0.6881648936170213,
 *    Gini:0.37632978723404253,
 *    mean_per_class_error:0.2958776595744681,
 *    domain:[0,1],
 *    thresholds_and_metric_scores: TwoDimTableV3,
 *    max_criteria_and_metric_scores:TwoDimTableV3,
 *    gains_lift_table:TwoDimTableV3}]}
 */
let TwoDimTableV3 = require("./TwoDimTableV3");
class ModelMetricsBinomialV3 {
    constructor(metrics) {
        let meta = metrics.__meta;
        if (meta.schema_name != 'ModelMetricsBinomialV3') {
            console.error(metrics);
        }
        this.thresholds_and_metric_scores = new TwoDimTableV3(metrics.thresholds_and_metric_scores);
    }

    getMetricsScores() {
        return this.thresholds_and_metric_scores;
    }
}

// module.exports = ModelMetricsBinomialV3;
module.exports=ModelMetricsBinomialV3;
