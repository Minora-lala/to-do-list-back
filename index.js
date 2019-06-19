let express = require('express');
let app = express();
let mongoose = require('mongoose');
let cors = require('cors');

let Test = require('./src/models/test');
let User = require('./src/models/user');

const packagejson = require('./package.json');
let PORT = 3000;
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json({type: 'application/json'});
app.use(jsonParser);
app.use(cors());
require('./src/modules/router.module')(app);

let connectToDb = function(){
    const database = 'mongodb://localhost:27017/testDB';
    return mongoose.connect(database,{ useNewUrlParser: true } , (err, db) => {
        if (err) {
            console.log('DB ERROR')
        } else {
            console.log('DB CONNECTED');
        }
    })};

// API HEALTH CHECK
app.get('/healthcheck', function (req, res) {
    res.status(200).send({ 'success': 'OK', 'apiVersion': packagejson.version });
});

let server = app.listen(PORT, ()=> {
    console.log('SERVER STARTED ON ' + PORT);
});

connectToDb();