/**
 * Created by weiqiang on 2017/4/27.
 */
/*
 * {__meta:{schema_version:3,schema_name:ModelKeyV3,schema_type:Key<Model>},
 * name:SVM_25587_24813_30510,
 * type:Key<Model>,
 * URL:/3/Models/SVM_25587_24813_30510}
 */
class ModelKeyV3 {
    constructor(model) {
        let meta = model.__meta;
        if (meta.schema_name != 'ModelKeyV3') {
            console.error(model);
        }
        this.name = model.name;
        this.type = model.type;
        this.URL = model.URL;
    }
}

module.exports = ModelKeyV3;