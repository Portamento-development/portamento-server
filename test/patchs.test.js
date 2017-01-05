const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../lib/app');
const request = chai.request(app);

describe('Patch CRUD routes', () => {
    const fakePatch = {
        name: 'testFred',
        favorites: 0,
        votes: 0
    };

    it('POSTS a patch', done => {
        request
            .post('/api/patchs')
            .send(fakePatch)
            .then(res => {
                console.log('res', res.body);
                fakePatch.__v = res.body.__v;
                fakePatch._id = res.body._id;
                console.log('fakePatch', fakePatch);
                assert.deepEqual(res.body, fakePatch);
                done();
            })
            .catch(done);
    });

    it('GETS a patch by ID', done => {
        request
            .get(`/api/patchs/${fakePatch._id}`)
            .then(res => {
                assert.deepEqual(res.body, fakePatch);
                done();
            })
            .catch(done);
    });

    it('Updates -PUT- a patch', done => {
        fakePatch.settings = 'settings2';

        request
            .put(`/api/patchs/${fakePatch._id}`)
            .send(fakePatch)
            .then(res => {
                assert.deepEqual(res.body, fakePatch);
                done();
            })
            .catch(done);
    });

    it('Deletes a patch', done => {
        request
            .delete(`/api/patchs/${fakePatch._id}`)
            .then(() => {
                request
                    .get('/api/patchs')
                    .then(res => {
                        assert.deepEqual(res.body, []);
                        done();
                    })
                    .catch(done);
            })
            .catch(done);
    });





});