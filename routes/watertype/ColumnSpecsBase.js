/**
 * Created by weiqiang on 2017/4/27.
 */
class ColumnSpecsBase {
    constructor(base) {
        let meta = base.__meta;
        if (meta.schema_name != 'ColumnSpecsBase') {
            console.error(base);
        }
        this.name = base.name;
    }
}

module.exports = ColumnSpecsBase;