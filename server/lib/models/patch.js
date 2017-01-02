const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    settings: {
        type: String
    },
    votes: {
        type: Number
    },
    favorites: {
        type: Number
    }
});

module.exports = mongoose.model('Patch', schema);