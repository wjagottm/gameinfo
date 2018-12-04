const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

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

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

module.exports = app;