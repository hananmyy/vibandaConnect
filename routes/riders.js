const express = require('express');
const router = express.Router();
const riderController = require('../controllers/riderController');
const authenticateToken = require('../middleware/authMiddleware');

// Define CRUD routes for riders
router.get('/',authenticateToken, riderController.getAllRiders);        // GET all riders
router.get('/:id',authenticateToken, riderController.getRiderById);     // GET a single rider by ID
router.post('/',authenticateToken, riderController.createRider);        // POST a new rider
router.put('/:id',authenticateToken, riderController.updateRider);      // PUT to update a rider
router.delete('/:id',authenticateToken, riderController.deleteRider);   // DELETE a rider

module.exports = router;
