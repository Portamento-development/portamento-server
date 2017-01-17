const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
    patchId: {
        type: Schema.Types.ObjectId,
        ref: 'Patch'
        // should this be required???
    },
    sequence: {
        type: Array,
        required: [true, 'Sequence array required.']
    },
    tempo: {
        type: Number,
        default: 120
    }
    // key: {
    //     type: String,
    //     default: 'C'
    // }

});

module.exports = mongoose.model('Sequence', schema);