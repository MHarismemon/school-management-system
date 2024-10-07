// routes/staffRoutes.js\
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const authMiddleware = require('../middleware/authMiddleware');

// Register Staff
router.post('/create', authMiddleware, staffController.registerStaff);

// Get All Staff
router.get('/get-all', authMiddleware, staffController.getAllStaff);

// Get Staff by ID
router.get('/get-by-id/:id', authMiddleware, staffController.getStaffById);

// Update Staff
router.put('/update/:id', authMiddleware, staffController.updateStaff);

// Delete Staff
router.delete('/delete/:id', authMiddleware, staffController.deleteStaff);

module.exports = router;
