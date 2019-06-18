var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Test = new Schema({
    nom: String,
    date: {type: Date, default: Date.now()},
    actions: [{type: Schema.Types.ObjectId, ref: 'Action'}]
});

module.exports = mongoose.model('Test', Test);