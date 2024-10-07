// routes/superAdminRoutes.js

const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');
// const authMiddleware = require('../middleware/authMiddleware'); // Ensure this middleware verifies Super Admin role

// Route to get dashboard data
router.get('/dashboard-data', superAdminController.getDashboardData);

module.exports = router;
