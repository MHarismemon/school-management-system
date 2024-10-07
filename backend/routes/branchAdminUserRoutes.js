// routes/branchAdminUserRoutes.js
const express = require('express');
const router = express.Router();
const branchAdminUserController = require('../controllers/branchAdminUserController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/list', authMiddleware, branchAdminUserController.getBranchAdminsWithUserData);

module.exports = router;
