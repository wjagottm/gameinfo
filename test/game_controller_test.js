const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const Game = mongoose.model('game');
const Developer = mongoose.model('developer');

let dev;
let game;
let authToken;

beforeEach((done) => {
    dev = new Developer({ name: 'test'})
    dev.save()
        .then(() => {
            game = new Game({ name: "test", developer: dev._id})
            game.save()
                .then(() => {
                    done();
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
    it('Delete to /api/thread/:id to delete a thread', (done) => {
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