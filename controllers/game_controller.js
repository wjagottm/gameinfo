const Game = require('../models/game');
const Character = require('../models/character');

module.exports = {
    get(req, res, next) {
        const gameId = req.params.id;

        Game.findById({ _id: gameId})
            .then((game) => res.send(game))
            .catch(next);
    },

    getAll(req, res, next) {
        Game.find()
            .then((game) => res.send(game))
            .catch(next);
    },

    getByDev(req, res, next) {
        const developer = req.params.id;

        Game.find({ developer: developer})
            .then((game) => res.send(game))
            .catch(next);
    },

    create(req, res, next) {
        const gameProps = req.body;

        Game.create(gameProps)
            .then(() => Game.findOne({ name: gameProps.name}))
            .then((game) => res.send(game))
            .catch(next);
    },

    addCharToGame(req, res, next) {
        const gameId = req.params.id;
        const charProps = req.body;

        Game.findById({_id: gameId})
            .then(game => {
                game.characters.push(charProps._id)
                game.save()
                    .then(() => Game.findById({ _id: gameId}))
                    .then(game => res.send(game))
                    .catch(next)
            })
            .catch(next);

    },

    edit(req, res, next) {
        const gameId = req.params.id;
        const gameProps = req.body;

        Game.findOneAndUpdate({ _id: gameId}, gameProps)
            .then((game) => res.send(game))
            .catch(next);
    },

    delete(req, res, next) {
        const gameId = req.params.id;

        Game.findOneAndDelete({ _id: gameId})
            .then(() => Character.deleteMany({ game: gameId}))
            .then(() => res.status(200).send())
            .catch(next);
    }
}