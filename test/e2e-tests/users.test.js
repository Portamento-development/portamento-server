const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../../lib/app');
const request = chai.request(app);

describe('User CRUD routes', () => {

    it('Gets all users', done => {
        request
            .get('/api/users')
            .then(res => {
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0].username, 'test');
                done();
            })
            .catch(done);
    });

    it('Gets random users', done => {
        request
            .get('/api/users/random')
            .then(res => {
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0].username, 'test');
                done();
            })
            .catch(done);
    });

    it('Gets recent users', done => {
        request
            .get('/api/users/recent')
            .then(res => {
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0].username, 'test');
                done();
            })
            .catch(done);
    });

});