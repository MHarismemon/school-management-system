const express = require('express');
const router = express.Router();
const holidayController = require('../controllers/holidayController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new Holiday
router.post('/create', authMiddleware, holidayController.createHoliday);

// Get all Holidays
router.get('/get-all', authMiddleware, holidayController.getAllHolidays);

// Get a single Holiday by ID
router.get('/get/:id', authMiddleware, holidayController.getHolidayById);

// Update a Holiday
router.put('/update/:id', authMiddleware, holidayController.updateHoliday);

// Delete a Holiday
router.delete('/delete/:id', authMiddleware, holidayController.deleteHoliday);

module.exports = router;
