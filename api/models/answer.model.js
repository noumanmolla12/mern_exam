const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  A: { type: String, required: true },
  B: { type: String, required: true },
  C: { type: String, required: true },
  D: { type: String, required: true },
  correct_answer: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    required: true
  }
}, {
  collection: 'answers'
});

module.exports = mongoose.model('Answer', answerSchema);
