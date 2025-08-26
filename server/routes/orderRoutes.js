const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderStatus,
  getMyOrders,
  getOrders,
  cancelOrder,
} = require('../controllers/orderController');
const { protect, admin, managerOrAdmin } = require('../middleware/authMiddleware');

// Protected routes
router.route('/')
  .post(protect, addOrderItems)
  .get(protect, managerOrAdmin, getOrders);

router.get('/myorders', protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrderById)
  .put(protect, cancelOrder);

router.route('/:id/pay')
  .put(protect, updateOrderToPaid);

router.route('/:id/deliver')
  .put(protect, managerOrAdmin, updateOrderToDelivered);

router.route('/:id/status')
  .put(protect, managerOrAdmin, updateOrderStatus);

module.exports = router;
