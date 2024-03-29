const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const routes = require('./routes/routes');
var jwt = require('jsonwebtoken');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.set('secretKey', 'nodeRestApi'); // jwt secret token

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

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

routes(app);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

module.exports = app;
