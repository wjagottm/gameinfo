const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    weapons: [String],
    abilities: [String],
    game: [{
        type: Schema.Types.ObjectId,
        ref: 'game',
        autopopulate: true
    }],
    imageUrl: String
})

CharacterSchema.plugin(require('mongoose-autopopulate'));

Character = mongoose.model('character', CharacterSchema);

module.exports = Character;