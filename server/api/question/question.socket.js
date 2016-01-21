/**
 * Broadcast updates to client when the model changes
 */

'use strict';
var Question = require('./question.model');
var QuestionEvents = require('./question.events');

// Model events to emit
var events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('question:' + event, socket);

    QuestionEvents.on(event, listener);

    function onSave(socket, doc, cb) {
      Question.populate(doc, {path:'author', select: 'name'}, function(err, question) {
        socket.emit('question:save', question);
      })
    }

    socket.on('disconnect', removeListener(event, listener));
  }
}



function createListener(event, socket) {
  return function(doc) {
    Question.populate(doc, {path:'author', select: 'name'}, function(err, question) {
      socket.emit('question:save', question);
    })
    //socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    QuestionEvents.removeListener(event, listener);
  };
}
