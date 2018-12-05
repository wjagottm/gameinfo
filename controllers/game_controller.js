const Game = require('../models/Game');

module.exports = {
    get(req, res, next) {
        const gameId = req.params.id;

        Game.findById({ _id: gameId})
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
            .then(() => res.status(200).send())
            .catch(next);
    }
}