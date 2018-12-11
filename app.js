const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
var jwt = require('jsonwebtoken');

const app = express();

app.set('secretKey', 'nodeRestApi'); // jwt secret token

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

if (process.env.NODE_ENV !== 'testENV') {
    mongoose.connect('mongodb+srv://wjagottm:Virawan40!@studit-yxb5u.azure.mongodb.net/gameinfo?retryWrites=true',
        { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => {
            console.log("Succesfully connected to main db");
        })
        .on('error', (error) => {
            console.warn('Error', error);
        })
} else {
    mongoose.connect('mongodb://localhost:27017/gameinfo_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => {
            console.log("Connected to test mongo db");
        })
        .on('error', err => {
            console.warn('Warning', err);
        });
}

app.use(express.bodyParser({limit: '50mb'}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

module.exports = app;
