const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const Game = mongoose.model('game');
const Developer = mongoose.model('developer');
const Character = mongoose.model('character');

let dev;
let game;
let char;
let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTE0MDBmNDc5NzljMDAxNjI4MTczZSIsImlhdCI6MTU0NDYzNDM5NSwiZXhwIjoxNTQ0NjYzMTk1fQ.2vtoaIR5l68xsBxxJGTcdOriL8bWURj2elNch_O0ias";

beforeEach((done) => {
    dev = new Developer({ name: 'test' })
    dev.save()
        .then(() => {
            game = new Game({ name: "test", developer: dev._id })
            game.save()
                .then(() => {
                    char = new Character({ name: "test", game: game._id })
                    char.save()
                        .then(() => done())
                })
        })
})

describe('Developer controller', () => {
    it('Post to /api/developer creates a new developer', (done) => {
        Developer.countDocuments().then(count => {
            request(app)
                .post('/api/developer')
                .set('X-Access-Token', authToken)
                .send({ name: 'test2'})
                .end(() => {
                    Developer.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    })
                });
        });
    });

    it('put to /api/game/:id edits a existing thread', (done) => {
        const developer2 = new Developer({ name: "testDev"});
        developer2.save().then(() => {
            request(app)
                .put(`/api/developer/${developer2._id}`)
                .set('X-Access-Token', authToken)
                .send({ name: 'test dev edit' })
                .end(() => {
                    Developer.findOne({ _id: developer2._id })
                        .then(developerTest => {
                            assert(developerTest.name === 'test dev edit');
                            done();
                        });
                });
        });
    });
    it('Delete to /api/developer/:id to delete a developer', (done) => {
        const developer2 = new Developer({ name: "testDev" });
        developer2.save().then(() => {
            request(app)
                .delete(`/api/developer/${developer2._id}`)
                .set('X-Access-Token', authToken)
                .send()
                .end(() => {
                    Developer.findOne({ _id: developer2._id })
                        .then(developerTest => {
                            assert(developerTest === null);
                            done();
                        });
                });
        });
    }).timeout(5000);;
})