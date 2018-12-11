const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeveloperSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    country: String,
    est: Date,
    games: [{
        type: Schema.Types.ObjectId,
        ref: 'game',
        autopopulate: true
    }],
    logoUrl: String
})

DeveloperSchema.pre('remove', function(next) {
    const Game = mongoose.model('game');
    const Character = mongoose.model('character');

    Game.findMany({ developer: this._id})
        .then((games) => {
            for (const gameObj in games) {
                Character.deleteMany({ game: gameObj._id})
                .then(() => Game.deleteMany({ developer: this._id}))
                .then(() => next())
            }
        })
});

DeveloperSchema.plugin(require('mongoose-autopopulate'));

Developer = mongoose.model('developer', DeveloperSchema);

module.exports = Developer;