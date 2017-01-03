const express = require('express');
const router = express.Router();
const Sequence = require('../models/sequence');
const bodyParser = require('body-parser').json();

router
    .get('/', (req, res, next) => {
        const query = {};
        if(req.query.patchId) query.patchId = req.query.patchId;

        Sequence.find(query)
            .populate('patchId')
            .lean()
            .then(sequences => res.send(sequences))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Sequence.findById(req.params.id)
            .populate('patchId')
            .lean()
            .then(sequence => res.send(sequence))
            .catch(next);
    })
    .post('/', bodyParser, (req, res, next) => {
        new Sequence(req.body).save()
            .then(newSequence => res.send(newSequence))
            .catch(next);
    })
    .put('/:id', bodyParser, (req, res, next) => {
        Sequence.findByIdAndUpdate(req.params.id, req.body, {new: true})
                .then(saved => res.send(saved))
                .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        Sequence.findByIdAndRemove(req.params.id)
                .then(removed => res.send(removed))
                .catch(next);
    });

module.exports = router;