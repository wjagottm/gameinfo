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

DeveloperSchema.plugin(require('mongoose-autopopulate'));

Developer = mongoose.model('developer', DeveloperSchema);

module.exports = Developer;