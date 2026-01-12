const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST /order → create a new order
router.post('/', orderController.createOrder);

// GET /order → get all orders with products
router.get('/', orderController.getOrders);

module.exports = router;
