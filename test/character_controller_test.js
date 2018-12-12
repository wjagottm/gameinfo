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

describe('Character controller', () => {
    it('Post to /api/character creates a new game', (done) => {
        Character.countDocuments().then(count => {
            request(app)
                .post('/api/character')
                .set('X-Access-Token', authToken)
                .send({ name: 'test2', game: game._id })
                .end(() => {
                    Character.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    })
                });
        });
    });

    it('put to /api/character/:id edits a existing character', (done) => {
        const char2 = new Character({ name: "testChar", game: game._id });
        char2.save().then(() => {
            request(app)
                .put(`/api/character/${char2._id}`)
                .set('X-Access-Token', authToken)
                .send({ name: 'test char edit' })
                .end(() => {
                    Character.findOne({ game: game._id })
                        .then(charTest => {
                            assert(charTest.name === 'test char edit');
                            done();
                        });
                });
        });
    });
    it('Delete to /api/character/:id to delete a character', (done) => {
        const char2 = new Character({ name: "testChar", game: game._id });
        char2.save().then(() => {
            request(app)
                .delete(`/api/character/${char2._id}`)
                .set('X-Access-Token', authToken)
                .send()
                .end(() => {
                    Character.findOne({ _id: char2._id })
                        .then(charTest => {
                            assert(charTest === null);
                            done();
                        });
                });
        });
    });
})