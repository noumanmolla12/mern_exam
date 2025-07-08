const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');

// Add
router.post('/add-category', async (req, res) => {
  let { course_name, parentCategory } = req.body;
console.log('PPPPPPP',req.body)

  try {

    if (parentCategory == "parent" || parentCategory=='') {
      parentCategory = null;
    }

    const newCategory = new Category({ course_name, parentCategory });
    await newCategory.save();
    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Update Category
router.put('/update/:id', async (req, res) => {
  const { course_name } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(req.params.id, { course_name }, { new: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete Category
router.delete('/delete/:id', async (req, res) => {

  console.log('(IDSSSS)',req.params.id);

  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Get All Categories
router.get('/all', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
