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
    dev = new Developer({ name: 'test'})
    dev.save()
        .then(() => {
            game = new Game({ name: "test", developer: dev._id})
            game.save()
                .then(() => {
                    char = new Character({ name: "test", game: game._id})
                    char.save()
                        .then(() => done())
                })
        })
})

describe('Game controller', () => {
    it('Post to /api/game creates a new game', (done) => {
        Game.countDocuments().then(count => {
            request(app)
                .post('/api/game')
                .set('X-Access-Token', authToken)
                .send({ name: 'test2', developer: dev._id })
                .end(() => {
                    Game.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    })
                });
        });
    });

    it('put to /api/game/:id edits a existing thread', (done) => {
        const game2 = new Game({ name: "testGame", developer: dev._id});
        game2.save().then(() => {
            request(app)
                .put(`/api/game/${game2._id}`)
                .set('X-Access-Token', authToken)
                .send({ name: 'test game edit' })
                .end(() => {
                    Game.findOne({ developer: dev._id })
                        .then(gameTest => {
                            assert(gameTest.name === 'test game edit');
                            done();
                        });
                });
        });
    });
    it('Delete to /api/game/:id to delete a game', (done) => {
        const game2 = new Game({ name: "testGame", developer: dev._id});
        game2.save().then(() => {
            request(app)
                .delete(`/api/game/${game2._id}`)
                .set('X-Access-Token', authToken)
                .send()
                .end(() => {
                    Game.findOne({ _id: game2._id })
                        .then(gameTest => {
                            assert(gameTest === null);
                            done();
                        });
                });
        });
    });
})