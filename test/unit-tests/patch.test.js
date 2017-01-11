const Patch = require('../../lib/models/patch');
const assert = require('chai').assert;

describe('It creates full patch model', () => {

    it('Should require name', done => {
        let patch = new Patch({
            votes: 0,
            favorites: 0
        });

        patch.validate(err => {
            assert.isOk(err, 'Name is required');
            assert.equal(err.errors['name'].message, 'Patch name required.');
            done();
        });
    });

    it('Should initialize votes and favorites to 0', done => {
        let patch = new Patch({
            name: 'testPatch'
        });
        
        patch.validate(err => {
            assert.equal(err, null);
            assert.equal(patch.votes, 0);
            assert.equal(patch.favorites, 0);
            done();
        });
    });

});