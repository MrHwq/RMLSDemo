/**
 * Created by weiqiang on 2017/4/21.
 */

let express = require('express');
let router = express.Router();

router.get("/:rolename", function (req, res, next) {
    // let rolename = req.params.rolename;
    // res.json({error: false, 'rolename': rolename});
})

module.exports = router;