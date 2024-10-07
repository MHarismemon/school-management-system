// routes/teacherLeaveRoutes.js

const express = require('express');
const router = express.Router();
const teacherLeaveController = require('../controllers/teacherLeaveController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadPdfTeacherLeave');

// Create a new leave request with file upload
router.post('/create', authMiddleware, upload.single('doc'), teacherLeaveController.createLeave);

// Get all leave requests
router.get('/get-all', authMiddleware, teacherLeaveController.getAllLeaves);

// Get a leave request by Leave ID
router.get('/get/:id', authMiddleware, teacherLeaveController.getLeaveById);

// Get leave requests by Teacher ID
router.get('/teacher/:teacherId', authMiddleware, teacherLeaveController.getLeavesByTeacherId);

// Update a leave request with file upload
router.put('/update/:id', authMiddleware, upload.single('doc'), teacherLeaveController.updateLeave);

// Delete a leave request
router.delete('/delete/:id', authMiddleware, teacherLeaveController.deleteLeave);

// Update Status
router.put('/update-status/:id', authMiddleware, teacherLeaveController.updateTeacherLeaveStatus);

module.exports = router;
