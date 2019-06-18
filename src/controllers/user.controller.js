let userBuilders = require('../builders/user.builders');






exports.getUsers = function (req, res) {
    console.log("req", req.body);
    userBuilders
        .getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).send("Could not connect to the database : " + err);
        });
};

exports.addUser = function(req, res){
    console.log("req", req.body);
    if (!req.body) {
        return res.status(404).json({ message: "Error, no user to create" });
    }
    userBuilders
        .addUser(req.body)
        .then((user, err) => {
            if (err) { return res.status(400).send(err); }
            res.status(201).send(user);
        })
        .catch(err => {
            res.status(500).send("Error creating user " + req.body.login + " : " + err);
        });
};


exports.authenticate = function (req, res, next) {
    userBuilders
        .authenticate(req.body)
        .then(user => {
            //console.log(user);
            if (user) {
                //console.log(user.dataValues);
                //console.log(user.dataValues.groups);
                user = user.dataValues;
                const groups = user.groups;
                user.groups = [];
                user.modules = [];
                for(let group of groups) {
                    user.groups.push(group.dataValues.id);
                    groupBuilder.getGroupByIdFull(group.dataValues.id).then(result => {
                        for (let groupDet of result.dataValues.groupm) {
                            console.log('Module Ajout:', groupDet.dataValues.name);
                            user.modules.push( groupDet.dataValues.name);
                        }
                    });
                }
            } else {
                res.status(400).json({ message: req.body.method + '_error' });
            }
        })
        .catch(err => next(err));
};
