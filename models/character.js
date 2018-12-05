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
    imageUrl: String
})

Character = mongoose.model('character', CharacterSchema);

module.exports = Character;