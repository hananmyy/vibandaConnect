const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController')
const authenticateToken = require('../middleware/authMiddleware');

// Define CRUD routes for vendors
router.get('/',authenticateToken, vendorController.getAllVendors);        // GET all vendors
router.get('/:id',authenticateToken, vendorController.getVendorById);     // GET a single vendor by ID
router.post('/',authenticateToken, vendorController.createVendor);        // POST a new vendor
router.put('/:id',authenticateToken, vendorController.updateVendor);      // PUT to update a vendor
router.delete('/:id',authenticateToken, vendorController.deleteVendor);   // DELETE a vendor

module.exports = router;
