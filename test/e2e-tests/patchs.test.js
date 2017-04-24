const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../../lib/app');
const request = chai.request(app);

describe('Patch CRUD routes', () => {
    const fakePatch = {
        name: 'testFred',
        favorites: 0,
        votes: 0
    };
    const fakePatch2 = {
        name: 'testTed',
        favorites: 5,
        votes: 3
    };
    const fakePatch3 = {
        name: 'testBill',
        favorites: 3,
        votes: 5
    };

    it('POSTs a patch', done => {
        request
            .post('/api/patchs')
            .send(fakePatch)
            .then(res => {
                fakePatch.__v = res.body.__v;
                fakePatch._id = res.body._id;
                assert.deepEqual(res.body, fakePatch);
                done();
            })
            .catch(done);
    });

    it('GETs all patches', done => {
        request
            .get('/api/patchs')
            .then(res => {
                assert.deepEqual(res.body[0], fakePatch);
                done();
            })
            .catch(done);
    });

    it('GETs a patch by ID', done => {
        request
            .get(`/api/patchs/${fakePatch._id}`)
            .then(res => {
                assert.deepEqual(res.body, fakePatch);
                done();
            })
            .catch(done);
    });

    it('GETs random patches', done => {
        request
            .get('/api/patchs/random')
            .then(res => {
                assert.deepEqual(res.body[0], fakePatch);
                done();
            })
            .catch(done);
    });

    it('GETs patches sorted by most votes', done => {
        let p1 = request
            .post('/api/patchs')
            .send(fakePatch2)
            .then(res => {
                fakePatch2.__v = res.body.__v;
                fakePatch2._id = res.body._id;
            })
            .catch(done);

        let p2 = request
            .post('/api/patchs')
            .send(fakePatch3)
            .then(res => {
                fakePatch3.__v = res.body.__v;
                fakePatch3._id = res.body._id;
            })
            .catch(done);

        Promise.all([p1, p2])
            .then(() => {
                request
                    .get('/api/patchs/votes')
                    .then(res => {
                        assert.deepEqual(res.body, [fakePatch3, fakePatch2, fakePatch]);
                        done();
                    })
                    .catch(done);
            });

    });

    it('GETs patches sorted by favorites', done => {
        request
            .get('/api/patchs/favs')
            .then(res => {
                assert.deepEqual(res.body, [fakePatch2, fakePatch3, fakePatch]);
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
                        assert.equal(res.body.length, 2);
                        done();
                    })
                    .catch(done);
            })
            .catch(done);
    });

});