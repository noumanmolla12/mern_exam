const express = require('express');
const router = express.Router();
const multer = require('multer');
const Topic = require('../models/topic.model');
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

// Route to add a new topic with image upload
router.post('/add-topic', upload.array('topic_image', 5), async (req, res) => {
  try {
    const { category, topic_name} = req.body;
    let imageNames = [];

    console.log('Request body:', req.body);
    console.log('Uploaded files:', req.files);

    if (req.files && req.files.length > 0) {
      // Get an array of names for the uploaded images, removing the 'uploads\' part
      imageNames = req.files.map(file => path.basename(file.path));
    }

    console.log('Image names:', imageNames);

    const newTopic = new Topic({
      category,
      topic_name,
    });

    console.log('New topic:', newTopic);

    const savedTopic = await newTopic.save();
    res.status(201).json(savedTopic);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route to fetch all topics
router.get('/all', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a topic by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const topicId = req.params.id;
    const deletedTopic = await Topic.findByIdAndDelete(topicId);
    if (!deletedTopic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.status(200).json({ message: 'Topic deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const topicId = req.params.id;
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.put('/update/:id', upload.array('topic_images', 5), async (req, res) => {
  try {
    const topicId = req.params.id;
    const { category, topic_name } = req.body;
    let updatedTopicData = {
      category,
      topic_name
    };


    // console.log('FILESS',req.files)
     

    if (req.files && req.files.length > 0) {
      // If new images are uploaded, update the topic_images field
      updatedTopicData.topic_images = req.files.map(file => file.filename);
    }

    const updatedTopic = await Topic.findByIdAndUpdate(topicId, updatedTopicData, { new: true });
   
   
    console.log('UPPP',updatedTopic)

    if (!updatedTopic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.status(200).json(updatedTopic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/category/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const topics = await Topic.find({ category: categoryId });
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
