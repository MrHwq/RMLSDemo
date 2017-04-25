/**
 * Created by weiqiang on 2017/4/21.
 */

var express = require('express');
var router = express.Router();

router.get("/:rolename", function (req, res, next) {
    var rolename = req.params.rolename;
    res.json({error: false, 'rolename': rolename});
})

module.exports = router;