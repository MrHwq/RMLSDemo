/**
 * Created by weiqiang on 2017/4/27.
 */
/*
 *{__meta:{schema_version:3,schema_name:TwoDimTableV3,schema_type:TwoDimTable},
 *    name:Metrics for Thresholds,
 *    description:Binomial metrics as a function of classification thresholds,
 *    columns:[
 *    ColumnSpecsBase...
 *    ],
 *    rowcount:60,
 *    data:[[]....]
 *}
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