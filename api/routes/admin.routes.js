const express = require('express');
const router = express.Router();
const multer = require('multer');
const Admin = require('../models/admin.model');
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
//http://localhost:8080/admin/add-admin
// Route to add a new admin with image upload
router.post('/add-admin', upload.array('admin_image', 5), async (req, res) => {
  try {
    const { admin_name, email, phone, admin_address, password, confirm_password, admin_dob} = req.body;
    let imageNames = [];

    console.log('Request body:', req.body);
    console.log('Uploaded files:', req.files);

    if (req.files && req.files.length > 0) {
      // Get an array of names for the uploaded images, removing the 'uploads\' part
      imageNames = req.files.map(file => path.basename(file.path));
    }

    console.log('Image names:', imageNames);


    const hashedPassword = await bcrypt.hash(password, 10); // added for hashpassword
  
    
    const newAdmin = new Admin({
      admin_name, 
      email,
      phone,
      password:hashedPassword,
      confirm_password,
      admin_dob,
      admin_address,
      admin_images: imageNames // Save the array of image names in the database
    });

    console.log('New admin:', newAdmin);

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});






//http://localhost:8080/admin/all

// Route to fetch all admins
router.get('/all', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a admin by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const adminId = req.params.id;
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




router.put('/update/:id', upload.array('admin_images', 5), async (req, res) => {
  try {
    const adminId = req.params.id;
    const { admin_name, email, phone, admin_address, password, confirm_password, admin_dob} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // added for hashpassword
    
    let imageNames = [];
    
    let updatedAdminData = {
      admin_name, 
      email,
      phone,
      password:hashedPassword,
      confirm_password,
      admin_dob,
      admin_address,
      admin_images: imageNames
     
    };


    // console.log('FILESS',req.files)
     

    if (req.files && req.files.length > 0) {
      // If new images are uploaded, update the admin_images field
      updatedAdminData.admin_images = req.files.map(file => file.filename);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updatedAdminData, { new: true });
   
   
    console.log('UPPP',updatedAdmin)

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get('/category/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const admins = await Admin.find({ category: categoryId });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
