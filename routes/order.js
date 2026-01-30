const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const adminAuth = require("../middleware/adminAuth");

// POST /order → create a new order
router.post('/', orderController.createOrder);

// GET /order → get all orders with products
router.get('/', adminAuth, orderController.getOrders);


module.exports = router;
