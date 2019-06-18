let mongoose = require('mongoose');
let User = mongoose.model('User');
const bcrypt = require("bcryptjs");

exports.getUsers = function(){
    return User.find({}).select('pseudo');
};

exports.getAll = function () {
    return User.find({
    });
};

exports.createUser = async function (user) {
    let checkUser = await User.findOne({ where: { login: user.login } });
    if (checkUser) { throw 'User already exist'; }
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(12));
    return User.create(user);
};

authenticate_local = async function (login, password) {
    let user = await User.findOne({
    });
    return (user && user.dataValues && bcrypt.compareSync(password, user.dataValues.password)) ? user : this.authenticate_empty();
};