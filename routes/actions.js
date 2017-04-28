/**
 * Created by weiqiang on 2017/4/19.
 */
let express = require('express');
let router = express.Router();
let parsefile = require('./actionsParseFile');
let readcsv = require('./actionsReadCSV');
let jobs = require('./actionsJobs');
let setrole = require('./actionsSetRole');
let splitdatabypercent = require('./actionsSplitDataByPercent');
let svm = require('./actionsSVM');
let applymodel = require('./actionsApplyModel');

router.use('/parsefile', parsefile);
router.use('/readcsv', readcsv);
router.use('/jobs', jobs);
router.use('/setrole', setrole);
router.use('/splitdatabypercent', splitdatabypercent);
router.use('/svm', svm);
router.use('/applymodel', applymodel);

module.exports = router;