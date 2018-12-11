const Developer = require('../models/developer');
const Game = require('../models/game');
const Character = require('../models/character');

module.exports = {
    get(req, res, next) {
        const developerId = req.params.id;

        Developer.findById({ _id: developerId})
            .then((developer) => res.send(developer))
            .catch(next);
    },

    getAll(req, res, next) {
        Developer.find()
            .then((game) => res.send(game))
            .catch(next);
    },

    create(req, res, next) {
        const developerProps = req.body;

        Developer.create(developerProps)
            .then(() => Developer.findOne({ name: developerProps.name}))
            .then((developer) => res.send(developer))
            .catch(next);
    },

    addGameToDev(req, res, next) {
        const developerId = req.params.id;
        const gameProps = req.body;

        Developer.findById({_id: developerId})
            .then(developer => {
                developer.games.push(gameProps._id)
                developer.save()
                    .then(() => Developer.findById({ _id: developerId}))
                    .then(developer => res.send(developer))
                    .catch(next)
            })
            .catch(next);
    },

    edit(req, res, next) {
        const developerId = req.params.id;
        const developerProps = req.body;

        Developer.findOneAndUpdate({ _id: developerId}, developerProps)
            .then((developer) => res.send(developer))
            .catch(next);
    },

    delete(req, res, next) {
        const developerId = req.params.id;

        Developer.deleteOne({ _id: developerId })
            .then(() => Game.find({ developer: developerId })
                .then((games) => {
                    if( games.length() >= 0) {
                        games.forEach(function (gameObj) {
                            Character.deleteMany({ game: gameObj._id })
                                .then(() => Game.deleteMany({ developer: developerId }))
                                .then(() => res.status(200).send())
                                .catch(next);
                        })
                    } else {
                        res.status(200).send();
                    }
                }))
    }
}