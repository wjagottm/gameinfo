const Developer = require('../models/developer');

module.exports = {
    get(req, res, next) {
        const developerId = req.params.id;

        Developer.findById({ _id: developerId})
            .them((developer) => res.send(developer))
            .catch(next);
    },

    getAll(req, res, next) {
        Developer.findMany()
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

    edit(req, res, next) {
        const developerId = req.params.id;
        const developerProps = req.body;

        Developer.findOneAndUpdate({ _id: developerId}, developerProps)
            .then((developer) => res.send(developer))
            .catch(next);
    },

    delete(req, res, next) {
        const developerId = req.params.id;

        Developer.findOneAndDelete({ _id: developerId})
            .then(() => res.status(200).send())
            .catch(next);
    }
}