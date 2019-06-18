let testBuilder = require('../builders/test.builders');
let mongoose = require('mongoose');
let Test = mongoose.model('Test');

exports.getTests = function (req, res) {
    console.log("req", req.body);
    testBuilder.getTests()
        .exec((err, tests) => {
            if(!err) res.send(tests);
        });
};

exports.addTest = function(req, res){
    console.log("req", req.body);
    let test = Test(req.body);
    test.save();
    res.send(test);
};