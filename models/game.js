const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genres: [String],
    description: String,
    price: Number,
    reviews: [{
        type: Number,
        min: 0,
        max: 5 
    }],
    released: Date,
    characters: [{
        type: Schema.Types.ObjectId,
        ref: 'character',
        autopopulate: true
    }],
    developer: String,
    imageUrl: String
})

GameSchema.plugin(require('mongoose-autopopulate'));

Game = mongoose.model('game', GameSchema);

module.exports = Game;