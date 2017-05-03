/**
 * Created by weiqiang on 2017/4/27.
 */

class ParseFileRet {
    constructor(ret = undefined) {
        if (ret != undefined) {
            this.setColumnNames(ret.column_names);
            this.setColumnTypes(ret.column_types);
        }
    }

    setColumnNames(column_names) {
        this.column_names = column_names;
    }

    getColumnNames() {
        return this.column_names;
    }

    setColumnTypes(column_types) {
        this.column_types = column_types;
    }

    getColumnTypes() {
        return this.column_types;
    }
}

module.exports = ParseFileRet;