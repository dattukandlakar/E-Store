const Product = require('../models/Product');

const express = require('express');
const router = express.Router();
// Get products by category name (case-insensitive)
router.get('/:name/products', async (req, res) => {
  try {
    const categoryName = req.params.name;
    // console.log(categoryName);
    const category = await require('../models/Category').findOne({
      name: { $regex: `^${categoryName}$`, $options: 'i' },
    });
   
    if (!category) return res.status(404).json({ message: 'Category not found' });
    const products = await Product.find({ category: category._id });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const { createCategory, getCategories } = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

// Create category (admin only)
router.post('/', protect, admin, createCategory);
// Get all categories
router.get('/', getCategories);

module.exports = router;
