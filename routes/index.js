var express = require('express');
var router = express.Router();
var request = require('request');
// var mongoose = require('mongoose');
// var db;
// if (process.env.VCAP_SERVICES) {
//     var env = JSON.parse(process.env.VCAP_SERVICES);
//     db = mongoose.createConnection(env['mongodb-2.2'][0].credentials.url);
// } else {
// db = mongoose.createConnection('localhost', 'pollsapp');
// }
// db.on('error', console.error.bind(console, '连接错误:'));
// db.once('open', function () {
//     //一次打开记录
//     console.log("the mongoose is open");
// });

// Get Poll schema and model
// var PollSchema = require('../models/pollmodel.js').PollSchema;
// var PollEntity = db.model('polls', PollSchema);

/* GET home page. */
router.get('/', function (req, res, next) {
    // request('http://www.baidu.com', function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log(body) // 打印google首页
    //     }
    res.render('index', {title: 'Express'});
    // })
});

// JSON API for list of polls
router.get('/polls/polls', function (req, res, next) {
    // Query Mongo for polls, just get back the question text
    // PollEntity.find({}, 'question', function (error, polls) {
    //     res.json(polls);
    // });
});

router.get('/polls/:id', function (req, res, next) {
    // Poll ID comes in the URL
    var pollId = req.params.id;

    // Find the poll by its ID, use lean as we won't be changing it
    // PollEntity.findById(pollId, '', {lean: true}, function (err, poll) {
    //     if (poll) {
    //         var userVoted = false,
    //             userChoice,
    //             totalVotes = 0;
    //
    //         // Loop through poll choices to determine if user has voted
    //         // on this poll, and if so, what they selected
    //         for (c in poll.choices) {
    //             var choice = poll.choices[c];
    //
    //             for (v in choice.votes) {
    //                 var vote = choice.votes[v];
    //                 totalVotes++;
    //
    //                 if (vote.ip === (req.header('x-forwarded-for') || req.ip)) {
    //                     userVoted = true;
    //                     userChoice = {_id: choice._id, text: choice.text};
    //                 }
    //             }
    //         }
    //
    //         // Attach info about user's past voting on this poll
    //         poll.userVoted = userVoted;
    //         poll.userChoice = userChoice;
    //         poll.totalVotes = totalVotes;
    //
    //         res.json(poll);
    //     } else {
    //         res.json({error: true});
    //     }
    // });
});

// JSON API for creating a new poll
router.post('/polls', function (req, res, next) {
    // console.log("newpolls");
    // var reqBody = req.body;
    // // Filter out choices with empty text
    // var choices = reqBody.choices.filter(function (v) {
    //     return v.text != '';
    // });
    // // Build up poll object to save
    // var pollObj = {question: reqBody.question, choices: choices};
    //
    // // Create poll model from built up poll object
    // var poll = new PollEntity(pollObj);
    //
    // // Save poll to DB
    // poll.save(function (err, doc) {
    //     if (err || !doc) {
    //         throw 'Error';
    //     } else {
    //         res.json(doc);
    //     }
    // });
});

var vote = function (socket) {
    // socket.on('send:vote', function (data) {
    //     var ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address;
    //
    //     PollEntity.findById(data.poll_id, function (err, poll) {
    //         var choice = poll.choices.id(data.choice);
    //         choice.votes.push({ip: ip});
    //
    //         poll.save(function (err, doc) {
    //             var theDoc = {
    //                 question: doc.question, _id: doc._id, choices: doc.choices,
    //                 userVoted: false, totalVotes: 0
    //             };
    //
    //             // Loop through poll choices to determine if user has voted
    //             // on this poll, and if so, what they selected
    //             for (var i = 0, ln = doc.choices.length; i < ln; i++) {
    //                 var choice = doc.choices[i];
    //
    //                 for (var j = 0, jLn = choice.votes.length; j < jLn; j++) {
    //                     var vote = choice.votes[j];
    //                     theDoc.totalVotes++;
    //                     theDoc.ip = ip;
    //
    //                     if (vote.ip === ip) {
    //                         theDoc.userVoted = true;
    //                         theDoc.userChoice = {_id: choice._id, text: choice.text};
    //                     }
    //                 }
    //             }
    //
    //             socket.emit('myvote', theDoc);
    //             socket.broadcast.emit('vote', theDoc);
    //         });
    //     });
    // });
};

router.post('/vote', vote);

router.vote = vote;

module.exports = router;