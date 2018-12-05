const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeveloperSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    country: String,
    est: Number,
    games: [{
        type: Schema.Types.ObjectId,
        ref: 'games',
        autopopulate: true
    }],
    logoUrl: String
})

DeveloperSchema.plugin(require('mongoose-autopopulate'));

Developer = mongoose.model('developer', DeveloperSchema);

module.exports = Developer;