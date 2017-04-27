/**
 * Created by weiqiang on 2017/4/27.
 */
/*
 {__meta:{schema_version:3,schema_name:RapidsNumberV3,schema_type:Iced},
  _exclude_fields:,
  ast:null,
  session_id:null,
  id:null,
  scalar:1.0}
 */
class RapidsNumberV3 {
    constructor(rapidsnumber) {
        this.ast = rapidsnumber.ast;
        this.session_id = rapidsnumber.session_id;
        this.id = rapidsnumber.id;
        this.scalar = rapidsnumber.scalar;
    }

    getAst() {
        return this.ast;
    }

    getSessionId() {
        return this.session_id;
    }

    getId() {
        return this.id;
    }

    getScalar() {
        return this.scalar;
    }
}

module.exports = RapidsNumberV3;