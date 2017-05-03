/**
 * Created by weiqiang on 2017/4/21.
 */

let express = require('express');
let router = express.Router();

router.get("/:rolename", function (req, res, next) {
    let rolename = req.params.rolename;
    res.json("nothing need to do");
})

module.exports = router;