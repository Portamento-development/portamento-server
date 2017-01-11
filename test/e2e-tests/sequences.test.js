const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../../lib/app');
const request = chai.request(app);

describe('Sequence CRUD routes', () => {
    const fakeSequence = {
        sequence: [1,2,3],
        tempo: 120
    };

    it('POSTS a sequence', done => {
        request
            .post('/api/sequences')
            .send(fakeSequence)
            .then(res => {
                fakeSequence.__v = res.body.__v;
                fakeSequence._id = res.body._id;
                assert.deepEqual(res.body, fakeSequence);
                done();
            })
            .catch(done);
    });

    it('GETS a sequence by ID', done => {
        request
            .get(`/api/sequences/${fakeSequence._id}`)
            .then(res => {
                assert.deepEqual(res.body, fakeSequence);
                done();
            })
            .catch(done);
    });

    it('Updates -PUT- a sequence', done => {
        fakeSequence.sequence = [4,5,6];

        request
            .put(`/api/sequences/${fakeSequence._id}`)
            .send(fakeSequence)
            .then(res => {
                assert.deepEqual(res.body, fakeSequence);
                done();
            })
            .catch(done);
    });

    it('Deletes a sequence', done => {
        request
            .delete(`/api/sequences/${fakeSequence._id}`)
            .then(() => {
                request
                    .get('/api/sequences')
                    .then(res => {
                        assert.deepEqual(res.body, []);
                        done();
                    })
                    .catch(done);
            })
            .catch(done);
    });

});