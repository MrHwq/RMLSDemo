/**
 * Created by weiqiang on 2017/4/19.
 */
let express = require('express');
let router = express.Router();
let parseFile = require('./actionsParseFile');
let readCsv = require('./actionsReadCSV');
let jobs = require('./actionsJobs');
let setRole = require('./actionsSetRole');
let splitDataByPercent = require('./actionsSplitDataByPercent');
let svm = require('./actionsSVM');
let applyModel = require('./actionsApplyModel');

router.use('/parsefile', parseFile);
router.use('/readcsv', readCsv);
router.use('/jobs', jobs);
router.use('/setrole', setRole);
router.use('/splitdatabypercent', splitDataByPercent);
router.use('/svm', svm);
router.use('/applymodel', applyModel);

module.exports = router;