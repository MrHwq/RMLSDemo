/**
 * Created by weiqiang on 2017/4/19.
 */
var express = require('express');
var router = express.Router();
var readcsv = require('./actionsReadCSV');
var setrole = require('./actionsSetRole');

router.use('/readcsv', readcsv);
router.use('/setrole', setrole);

module.exports = router;