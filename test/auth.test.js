const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../lib/app');
const request = chai.request(app);

describe('User signup/signin', () => {

    it('Signs up a user', done => {
        request
            .post('/api/auth/signup')
            .send({ username: 'test', password: 'testPW' })
            .then(res => {
                assert.equal(res.status, 200);
                assert.isOk(res.body);
                assert.equal(res.body.username, 'test');
                done();
            })
            .catch(done);
    });

    function badRequest(url, send, error, done) {
        request
            .post(url)
            .send(send)
            .then(() => done('status should not be 200'))
            .catch(res => {
                assert.equal(res.status, 400);
                assert.equal(res.response.body.error, error);
                done();
            })
            .catch(done);
    }

    it('Requires password for signup', done => {
        badRequest('/api/auth/signup', { password: 'xyz' }, 'Username and password required', done);
    });

    it('Requires username for signup', done => {
        badRequest('/api/auth/signup', { username: 'blippo' }, 'Username and password required', done);
    });

    it('Requires password for signin', done => {
        badRequest('/api/auth/signin', { password: 'xyz' }, 'Invalid username or password.', done);
    });

    it('Requires username for signin', done => {
        badRequest('/api/auth/signin', { username: 'blippo' }, 'Invalid username or password.', done);
    });

    it('Signs users in', done => {
        request
            .post('/api/auth/signin')
            .send({ username: 'test', password: 'testPW' })
            .then(res => {
                assert.equal(res.status, 200);
                assert.isOk(res.body);
                assert.equal(res.body.username, 'test');
                done();
            })
            .catch(done);
    });

    it('Rejects bad password', done => {
        request
            .post('/api/auth/signin')
            .send({ username: 'test', password: 'wrongPW' })
            .then(() => {
                done('Should not be status 200.');
            })
            .catch(err => {
                assert.equal(err.status, 400);
                assert.equal(err.response.body.error, 'Invalid username or password.');
                done();
            });
    });

    it('Rejects unused username in signin', done => {
        request
            .post('/api/auth/signin')
            .send({ username: 'wrongUser', password: 'testPW' })
            .then(() => {
                done('Should not be status 200.');
            })
            .catch(err => {
                assert.equal(err.status, 400);
                assert.equal(err.response.body.error, 'Invalid username or password.');
                done();
            });
    });

    it('Rejects username that already exists', done => {
        request
            .post('/api/auth/signup')
            .send({ username: 'test', password: 'newPW' })
            .then(() => {
                done('Should not be status 200');
            })
            .catch(err => {
                assert.equal(err.status, 400);
                assert.equal(err.response.body.error, 'Username test already exists');
                done();
            });
    });

});