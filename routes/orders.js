const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateToken = require('../middleware/authMiddleware');

// Route to create an order
router.post('/create',authenticateToken, orderController.createOrder);

// Route to get all orders
router.get('/',authenticateToken, orderController.getAllOrders);

// Route to get a single order
router.get('/:id',authenticateToken, orderController.getOrder);

// Route to update an order
router.put('/:id',authenticateToken, orderController.updateOrder);

// Route to delete an order
router.delete('/:id',authenticateToken, orderController.deleteOrder);

module.exports = router;
