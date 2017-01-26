const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const schema = new Schema({
    username: {
        type: String,
        required: [true, 'Username required.']
    },
    password: {
        type: String,
        required: [true, 'Password required.']
    },
    followers: {
        type: Number,
        required: [true, 'User followers required'],
        default: 0
    },
    patches: [{
        type: Schema.Types.ObjectId,
        ref: 'Patch',
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Patch',
    }]
});
schema.methods.generateHash = function(password) {
    return this.password = bcrypt.hashSync(password, 8);
};

schema.methods.compareHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', schema);