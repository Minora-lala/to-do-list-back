const jwt = require("jsonwebtoken");
const secret = require('../../config/secret.json').secret;
const User = require("../models").User;


exports.tokenizer = function (user) {
    // parseInt de la variable d'environnement : String compris en ms ; Int compris en sec !!!
    const exp = parseInt(process.env.JWT_MAX_EXP_SEC);

    return jwt.sign({ sub: user.id/*, roleAuth: "LAMBDA" */}, secret, { expiresIn: exp });
}



exports.auth = function (req, res, next) {
    //console.log("What is your role ? ", req.body.jwtRole);
    try {
        //const token = (req.headers && req.headers.authorization) ? req.headers.authorization : "";
        let token = "";
        if (req.headers && req.headers.authorization) {
            const bearerToken = req.headers.authorization.split(" ");
            console.log("token ?? : ", bearerToken);
            if(bearerToken.length > 1) {
                token = bearerToken[1];
            }
        }
        console.log("token : ", token);
        jwt.verify(token, secret, function (err, payload) {
            if (err) {
                console.log("err : ", err.name, err.message);
                res.status(401).json({ message: err.name });
                return;
            }

            if (payload) {
                console.log("payload : ", payload);
                /*if(req.body.jwtRole && req.body.jwtRole.includes(payload.roleAuth)){
                    //console.log('ok role');
                    next();
                } else {
                    res.status(400).json({ message: 'role non accepte' });
                    return;
                }*/
            }
        })
    } catch (e) {
        console.log("crotte : ", e);
        next();
    }
}

exports.verifyAdminToken = function (req, res, next) {
    let token = req.headers['token'];
    if (!token)
        return res.send(shared.statusCode("error", 403, "No token provided.", {
            auth: false,
            message: 'No token provided.'
        }));

    token = token.substring(1, req.headers['token'].length - 1);
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.send(shared.statusCode("error", 500, "Failed to authenticate token.", {
                auth: false,
                message: 'Failed to authenticate token.'
            }));

        if (decoded.authorizationLevel === "ADMIN") {
            // if everything good, save to request for use in other routes
            req.userId = decoded.id;
            next();
        } else {
            return res.send(shared.statusCode("error", 500, "Failed to authenticate token.", {
                auth: false,
                message: 'Failed to authenticate unauthorized user.'
            }));
        }
    });
};

exports.verifyToken = function (req, res, next) {
    let token = req.headers['token'];
    if (!token)
        return res.send(shared.statusCode("error", 403, "No token provided.", {
            auth: false,
            message: 'No token provided.'
        }));
    token = token.substring(1, req.headers['token'].length - 1);
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.send(shared.statusCode("error", 500, "Failed to authenticate token.", {
                auth: false,
                message: 'Failed to authenticate token.'
            }));

        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
};
