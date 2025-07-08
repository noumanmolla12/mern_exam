const express = require('express');
const router = express.Router();
const multer = require('multer');
const answerModel = require('../models/answer.model');
const path = require('path');

// Middleware to enable CORS
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// ✅ Route to add a new answer with image upload
router.post('/add-answer', upload.array('answer_image', 5), async (req, res) => {
  try {
    const { question, A, B, C, D, correct_answer } = req.body;
    let imageNames = [];

    if (req.files && req.files.length > 0) {
      imageNames = req.files.map(file => path.basename(file.path));
    }

    const newAnswer = new answerModel({
      question,
      A,
      B,
      C,
      D,
      correct_answer,
      answer_images: imageNames, // Store image names
    });

    const savedAnswer = await newAnswer.save();
    res.status(201).json(savedAnswer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ Route to fetch all answers
router.get('/all', async (req, res) => {
  try {
    const answers = await answerModel.find();
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Route to get a single answer by ID
router.get('/:id', async (req, res) => {
  try {
    const answerId = req.params.id;
    const singleAnswer = await answerModel.findById(answerId);
    if (!singleAnswer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    res.status(200).json(singleAnswer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Route to get answers by Question ID
router.get('/question/:questionId', async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const answers = await answerModel.find({ question: questionId });
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Route to update an answer
router.put('/update/:id', upload.array('answer_images', 5), async (req, res) => {
  try {
    const answerId = req.params.id;
    const { question, A, B, C, D, correct_answer } = req.body;
    let updatedAnswerData = { question, A, B, C, D, correct_answer };

    if (req.files && req.files.length > 0) {
      updatedAnswerData.answer_images = req.files.map(file => file.filename);
    }

    const updatedAnswer = await answerModel.findByIdAndUpdate(answerId, updatedAnswerData, { new: true });

    if (!updatedAnswer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    res.status(200).json(updatedAnswer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Route to delete an answer
router.delete('/delete/:id', async (req, res) => {
  try {
    const answerId = req.params.id;
    const deletedAnswer = await answerModel.findByIdAndDelete(answerId);
    if (!deletedAnswer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    res.status(200).json({ message: 'Answer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
