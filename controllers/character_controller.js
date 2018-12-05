const Character = require('../models/character');

module.exports = {
    get(req, res, next) {
        const characterId = req.params.id;

        Character.findById({ _id: characterId})
            .then((character) => res.send(character))
            .catch(next);
    },

    create(req, res, next) {
        const characterProps = req.body;

        Character.create(characterProps)
            .then(() => Character.findOne({ name: characterProps.name}))
            .then((character) => res.send(character))
            .catch(next);
    },

    edit(req, res, next) {
        const characterId = req.params.id;
        const characterProps = req.body;

        Character.findOneAndUpdate({ _id: characterId}, characterProps)
            .then((character) => res.send(character))
            .catch(next);

    },

    delete(req, res, next) {
        const characterId = req.params.id;

        Character.findOneAndDelete({ _id: characterId})
            .then(() => res.status(200).send())
            .catch(next);

    }
}