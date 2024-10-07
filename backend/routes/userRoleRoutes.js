const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRoleController');
const authMiddlerware = require('../middleware/authMiddleware')

// Create a new user role
router.post('/create', userRoleController.createUserRole);

// Get all user roles
router.get('/get-all', authMiddlerware, userRoleController.getAllUserRoles);

// Get all user roles for select list
router.get('/get-user-role-select-list', userRoleController.getUserRolesSelectList);

// Get a user role by ID
router.get('/get-by-id/:id', userRoleController.getUserRoleById);

// Update a user role
router.put('/update/:id', userRoleController.updateUserRole);

// Delete a user role
router.delete('/delete/:id', userRoleController.deleteUserRole);

module.exports = router;
