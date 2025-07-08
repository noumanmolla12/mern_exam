// authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/admin.model');



//localhost:8080/loginadmin/login
//http://localhost:8080/loginadmin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    5
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

    // Exclude password from the user object
    const { password: userPassword, ...userData } = user.toObject();

    // Return user data without the password
    res.json({ user: userData, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});












































// Logout route
router.post('/logout', (req, res) => {
  // Clear any session data or cookies if needed
  
  // Respond with an empty object
  res.json({});
});






router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  console.log('BBB', req.body);
  try {
    // Check if the user already exists based on email
    const existingUser = await User.findOne({ email });

    // If user with the provided email already exists, return an error
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // If user doesn't exist, hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
   
  // console.log('Before Save',newUser);
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Get user details
router.get('/user-details', async (req, res) => {
  // Check if the user is authenticated
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token.split(' ')[1], 'secret_key'); //dought
    // Find the user by ID
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user details
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


bcrypt
module.exports = router;
