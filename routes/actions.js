/**
 * Created by weiqiang on 2017/4/19.
 */
var express = require('express');
var router = express.Router();
var parsefile = require('./actionsParseFile');
var readcsv = require('./actionsReadCSV');
var setrole = require('./actionsSetRole');
var splitdatabypercent = require('./actionsSplitDataByPercent');
var buildmodel = require('./actionsBuildModel');
var applymodel = require('./actionsApplyModel');

router.use('/parsefile', parsefile);
router.use('/readcsv', readcsv);
router.use('/setrole', setrole);
router.use('/splitdatabypercent', splitdatabypercent);
router.use('/buildmodel', buildmodel);
router.use('/applymodel', applymodel);

module.exports = router;