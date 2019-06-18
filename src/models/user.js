let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let User = new Schema({
    nom: String,
    password: String
});

module.exports = mongoose.model('User', User);