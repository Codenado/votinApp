/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/questions              ->  index
 * POST    /api/questions              ->  create
 * GET     /api/questions/:id          ->  show
 * PUT     /api/questions/:id          ->  update
 * DELETE  /api/questions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Question = require('./question.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Questions
export function index(req, res) {
  Question.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Question from the DB
export function show(req, res) {
  Question.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Question in the DB
export function create(req, res) {
  Question.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Question in the DB
export function update(req, res) {
  Question.findOne({'_id': req.params.id}, function(err, question){
    var didVote = question.voters.filter(function(voter){
      return voter.voter_id == req.user._id
  })

    if(didVote.length < 1){
      console.log('here')
      question.voters.push({ voter_id : req.user._id })
      var choice = question.choices.id(req.query.name)
      choice.votes += 1
      question.save(function(err, question){
        if (err){
          console.log(err)
        }
        return res.json(question)
      })
    }
   })
}

// Deletes a Question from the DB
export function destroy(req, res) {
  Question.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
