const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  examId: {
    type: String,
    required: true,
    ref: "Exam"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Question"
  },
  answerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Answer"
  },
  selectAnswer: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'D']
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Exam", examSchema);
