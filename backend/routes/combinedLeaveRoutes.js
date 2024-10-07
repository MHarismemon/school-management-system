// routes/combinedLeaveRoutes.js

const express = require('express');
const router = express.Router();
const combinedLeaveController = require('../controllers/combinedLeaveController');
const authMiddleware = require('../middleware/authMiddleware');

// Get combined leaves
router.get('/get-combined-leaves', authMiddleware, combinedLeaveController.getCombinedLeaves);

module.exports = router;
