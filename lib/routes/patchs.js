const express = require('express');
const router = express.Router();
const Patch = require('../models/patch');
const bodyParser = require('body-parser').json();

router
  .get('/', (req, res, next) => {
      const query = {};
      if(req.query.userId) query.userId = req.query.userId;

      Patch.find(query)
          .populate('userId', 'username')
          .lean()
          .then(patchs => res.send(patchs))
          .catch(next);
  })
  .get('/votes', (req, res, next) => {
      const query = {};
      if(req.query.userId) query.userId = req.query.userId;

      Patch.find(query)
            .populate('userId', 'username')
            .sort({votes: -1})
            .limit(10)
            .lean()
            .then(patchs => res.send(patchs))
            .catch(next);
  })
  .get('/favs', (req, res, next) => {
      const query = {};
      if(req.query.userId) query.userId = req.query.userId;

      Patch.find(query)
            .populate('userId', 'username')
            .sort({favorites: -1})
            .limit(10)
            .lean()
            .then(patchs => res.send(patchs))
            .catch(next);
  })
  .get('/:id', (req, res, next) => {
      Patch.findById(req.params.id)
          .populate('userId', 'username')
          .lean()
          .then(patch => res.send(patch))
          .catch(next);
  })
  .post('/', bodyParser, (req, res, next) => {
      new Patch(req.body).save()
          .then(newPatch => res.send(newPatch))
          .catch(next);
  })
  .put('/:id', bodyParser, (req, res, next) => {
      Patch.findByIdAndUpdate(req.params.id, req.body, {new: true})
          .then(saved => res.send(saved))
          .catch(next);
  })
  .delete('/:id', (req, res, next) => {
      Patch.findByIdAndRemove(req.params.id)
          .then(removed => res.send(removed))
          .catch(next);
  });

module.exports = router;