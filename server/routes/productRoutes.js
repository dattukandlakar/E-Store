const { getProductsByCategory } = require('../controllers/productController');
// Get products by category
const express = require('express');
const router = express.Router();
router.get('/category/:categoryId', getProductsByCategory);


const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getFeaturedProducts,
} = require('../controllers/productController');
const { protect, admin, managerOrAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProducts);
router.get('/top', getTopProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

// Protected routes
router.post('/:id/reviews', protect, createProductReview);

// Admin routes
router.route('/')
  .post(protect, managerOrAdmin, createProduct);

router.route('/:id')
  .put(protect, managerOrAdmin, updateProduct)
  .delete(protect, managerOrAdmin, deleteProduct);

module.exports = router;
