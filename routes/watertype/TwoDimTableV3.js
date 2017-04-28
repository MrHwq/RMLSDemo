/**
 * Created by weiqiang on 2017/4/27.
 */
let ColumnSpecsBase = require("./ColumnSpecsBase");

class TwoDimTableV3 {
    constructor(table) {
        let meta = table.__meta;
        if (meta.schema_name != 'TwoDimTableV3') {
            console.error(table);
        }
        this.columns = [];
        for (let key in table.columns) {
            this.columns.push(new ColumnSpecsBase(table.columns[key]));
        }
        this.rowcount = table.rowcount;
        this.data = table.data;
    }

    getColumns() {
        return this.columns;
    }

    getRowCount() {
        return this.rowcount;
    }

    getData() {
        return this.data;
    }
}

module.exports = TwoDimTableV3;