/**
 * Created by weiqiang on 2017/4/27.
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
