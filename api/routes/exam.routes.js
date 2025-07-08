const express = require('express');
const router = express.Router();
const Submission = require('../models/exam.model');

// POST: /api/exams/submit
router.post('/submit', async (req, res) => {
  const { examId, userId, answers } = req.body;

  if (!examId || !userId || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'Invalid request format' });
  }

  try {
    const submissions = answers.map((ans) => ({
      examId,
      userId,
      questionId: ans.questionId,
      answerId: ans.answerId,
      selectAnswer: ans.selectAnswer
    }));

    await Submission.insertMany(submissions);
    res.status(201).json({ message: 'Exam answers submitted successfully' });
  } catch (err) {
    console.error("Submission error:", err);
    res.status(500).json({ error: 'Failed to submit exam answers' });
  }
});

module.exports = router;
