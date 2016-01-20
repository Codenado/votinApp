'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema

var QuestionSchema = new Schema({
  title: String,
  date: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  choices: [ { name: String,  votes: { type: Number , default: 0  }} ],
  voters:[{ voter_id: String}]
})

export default mongoose.model('Question', QuestionSchema)
