// routes/superAdminLeaveRoute.js

const express = require('express');
const router = express.Router();
const superAdminLeaveController = require('../controllers/superAdminLeaveController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadPdfBranchAdminLeave');

// Get all leaves
router.get('/leaves', authMiddleware,superAdminLeaveController.getAllLeaves);

// Create a leave (with file upload)
router.post('/leave', authMiddleware, upload.single('doc'), superAdminLeaveController.createLeaveBySuperAdmin);

// Update a leave
router.put('/leave/:leaveId', authMiddleware,superAdminLeaveController.updateLeaveBySuperAdmin);

// Delete a leave
router.delete('/leave/:leaveId', authMiddleware,superAdminLeaveController.deleteLeaveBySuperAdmin);

// Update Status
router.put('/update-status/:id', authMiddleware, superAdminLeaveController.updateSuperAdminLeaveStatus);

module.exports = router;
