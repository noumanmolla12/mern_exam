const express = require('express');
const router = express.Router();
const multer = require('multer');
const Student = require('../models/student.model');
const path = require('path');
const bcrypt = require('bcrypt'); // added for hashpassword



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

// Route to add a new student with image upload
router.post('/add-student', upload.array('student_image', 5), async (req, res) => {
  try {
    const { student_name,  email, phone, password, confirm_password, student_dob, student_address} = req.body;
    let imageNames = [];

    console.log('Request body:', req.body);
    console.log('Uploaded files:', req.files);

    if (req.files && req.files.length > 0) {
      // Get an array of names for the uploaded images, removing the 'uploads\' part
      imageNames = req.files.map(file => path.basename(file.path));
    }

    console.log('Image names:', imageNames);


    const hashedPassword = await bcrypt.hash(password, 10); // added for hashpassword
  
    
    const newStudent = new Student({
      student_name,
      email,
      phone,
      password:hashedPassword,
      confirm_password,
      student_dob,
      student_address,
      student_images: imageNames // Save the array of image names in the database
    });

    console.log('New student:', newStudent);

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route to fetch all students
router.get('/all', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a student by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.put('/update/:id', upload.array('student_images', 5), async (req, res) => {
  try {
    const studentId = req.params.id;
    const { student_name, email, phone, password, confirm_password, student_dob, student_address} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // added for hashpassword
    
    let imageNames = [];
    
    let updatedStudentData = {
      student_name,
      email,
      phone,
      password:hashedPassword,
      confirm_password,
      student_dob,
      student_address,
      student_images: imageNames // Save the array of image names in the database
    };


    // console.log('FILESS',req.files)
     

    if (req.files && req.files.length > 0) {
      // If new images are uploaded, update the student_images field
      updatedStudentData.student_images = req.files.map(file => file.filename);
    }

    const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedStudentData, { new: true });
   
   
    console.log('UPPP',updatedStudent)

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/category/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const students = await Student.find({ category: categoryId });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
