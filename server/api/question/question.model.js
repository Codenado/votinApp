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
  choices: [{ name: String,  votes: { type: Number , default: 0  }} ],
  totalVotes: { type: Number , default: 0  }
})

QuestionSchema.statics = {
  loadRecent: function(cb) {
    this.find({})
      .populate({path:'author', select: 'name'})
      .sort('-date')
      .limit(6)
      .exec(cb);
  }
}

export default mongoose.model('Question', QuestionSchema)
