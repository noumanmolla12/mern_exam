const express = require('express');
const router = express.Router();
const multer = require('multer');
const Question = require('../models/question.model');
const path = require('path');

// Middleware to enable CORS
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the specified HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allow the specified headers
  next();
});

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where you want to store uploaded images
  },
  filename: function (req, file, cb) {
    // Log the file name here
    console.log('File name:', file.originalname);
    // Use a unique filename to avoid overwriting
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to add a new question with image upload
router.post('/add-question', upload.array('question_image', 5), async (req, res) => {
  try {
    const { topic, question_text} = req.body;
    let imageNames = [];

    console.log('Request body:', req.body);
    console.log('Uploaded files:', req.files);

    if (req.files && req.files.length > 0) {
      // Get an array of names for the uploaded images, removing the 'uploads\' part
      imageNames = req.files.map(file => path.basename(file.path));
    }

    console.log('Image names:', imageNames);

    const newQuestion = new Question({
      topic,
      question_text,
    });

    console.log('New question:', newQuestion);

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route to fetch all questions
router.get('/all', async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a question by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    const deletedQuestion = await Question.findByIdAndDelete(questionId);
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.put('/update/:id', upload.array('question_images', 5), async (req, res) => {
  try {
    const questionId = req.params.id;
    const { topic, question_text } = req.body;
    let updatedQuestionData = {
      topic,
      question_text
    };


    // console.log('FILESS',req.files)
     

    if (req.files && req.files.length > 0) {
      // If new images are uploaded, update the question_images field
      updatedQuestionData.question_images = req.files.map(file => file.filename);
    }

    const updatedQuestion = await Question.findByIdAndUpdate(questionId, updatedQuestionData, { new: true });
   
   
    console.log('UPPP',updatedQuestion)

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/topic/:topicId', async (req, res) => {
  try {
    const topicId = req.params.topicId;
    const questions = await Question.find({ topic: topicId });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
