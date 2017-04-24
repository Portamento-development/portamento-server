const Sequence = require('../../lib/models/sequence');
const assert = require('chai').assert;

describe('It creates full sequence model', () => {

    it('Should require sequence', done => {
        let sequence = new Sequence({
            tempo: 60
        });

        sequence.validate(err => {
            assert.isOk(err, 'Sequence array is required.');
            assert.equal(err.errors['sequence'].message, 'Sequence array required.');
            done();
        });
    });

    it('Should initialize tempo to 120', done => {
        let sequence = new Sequence({
            sequence: [1, 2, 3, 4]
        });
        
        sequence.validate(err => {
            assert.equal(err, null);
            assert.equal(sequence.tempo, 120);
            done();
        });
    });

});