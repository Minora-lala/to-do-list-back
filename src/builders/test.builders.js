let mongoose = require('mongoose');
let Test = mongoose.model('Test');

exports.getTests = function(){
   return Test.find({})
       .populate({
           path:'actions',
           select: 'nom'
       });
};

