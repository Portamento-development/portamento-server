const User = require('../../lib/models/user');
const assert = require('chai').assert;

describe('It creates full user model', () => {

    it('Should require username and password', done => {
        let user1 = new User({
            username: 'testUser',
            followers: 10
        });
        let user2 = new User({
            password: 'testPW',
            followers: 10
        });

        user1.validate(err => {
            assert.isOk(err, 'Password required.');
            assert.equal(err.errors['password'].message, 'Password required.');
        });
        user2.validate(err => {
            assert.isOk(err, 'Username required.');
            assert.equal(err.errors['username'].message, 'Username required.');
            done();
        });
    });

    it('Should default followers to 0', done => {
        let user = new User({
            username: 'testUser3',
            password: 'testPw3'
        });

        user.validate(err => {
            assert.equal(err, null);
            assert.equal(user.followers, 0);
            done();
        });
    });

});