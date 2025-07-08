const express = require('express');
const router = express.Router();
const Submission = require('../models/exam.model');
const Answer = require('../models/answer.model');

router.get('/result/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const submissions = await Submission.find({ userId });

    const groupedByExam = {};
    submissions.forEach(sub => {
      if (!groupedByExam[sub.examId]) {
        groupedByExam[sub.examId] = [];
      }
      groupedByExam[sub.examId].push(sub);
    });

    const results = await Promise.all(
      Object.entries(groupedByExam).map(async ([examId, examSubmissions]) => {
        let correct = 0;

        const details = await Promise.all(
          examSubmissions.map(async (submission) => {
            const answer = await Answer.findById(submission.answerId);
            const isCorrect = submission.selectAnswer === answer.correct_answer;
            if (isCorrect) correct++;

            return {
              questionId: submission.questionId,
              selected: submission.selectAnswer,
              correctAnswer: answer.correct_answer,
              isCorrect
            };
          })
        );

        const total = examSubmissions.length;
        const percentage = ((correct / total) * 100).toFixed(2);
        const status = percentage >= 40 ? 'Pass' : 'Fail';

        return {
          examId,
          total,
          correct,
          wrong: total - correct,
          percentage,
          status,
          details,
          submittedAt: examSubmissions[0].submittedAt,
        };
      })
    );

    res.json({ userId, results });

  } catch (err) {
    console.error("Result fetch error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
