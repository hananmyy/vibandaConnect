const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authenticateToken = require('../middleware/authMiddleware');

// Define CRUD routes for customers
router.get('/',authenticateToken, customerController.getAllCustomers);        // GET all customers
router.get('/:id',authenticateToken, customerController.getCustomerById);     // GET a single customer by ID
router.post('/',authenticateToken, customerController.createCustomer);        // POST a new customer
router.put('/:id',authenticateToken, customerController.updateCustomer);      // PUT to update a customer
router.delete('/:id',authenticateToken, customerController.deleteCustomer);   // DELETE a customer

module.exports = router;
