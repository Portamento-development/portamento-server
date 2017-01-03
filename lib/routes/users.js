const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bodyParser = require('body-parser').json();

router
    .get('/', (req, res, next) => {
        const query = {};

        User.find(query)
            .populate('patchId', 'name votes favorites')
            .populate('followingId', 'username')
            .populate('favoriteId', 'name votes favorites')
            .lean()
            .then(users => res.send(users))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        User.findById(req.params.id)
            .populate('patchId followingId favoriteId')
            .lean()
            .then(sequence => res.send(sequence))
            .catch(next);
    })
    .put('/:id', bodyParser, (req, res, next) => {
        User.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(saved => res.send(saved))
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        User.findByIdAndRemove(req.params.id)
            .then(removed => res.send(removed))
            .catch(next);
    });

module.exports = router;