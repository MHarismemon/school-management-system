const UserRole = require('../models/UserRole');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response');

// Create a new user role
exports.createUserRole = async (req, res) => {
    const { name } = req.body;

    try {

        const existingUserRole = await UserRole.find({ name });
        if (existingUserRole.length > 0) {
            return sendErrorResponse(res, 400, 'User role already exist');
        }

        const userRole = new UserRole({ name });
        await userRole.save();
        sendSuccessResponse(res, 201, 'User role created successfully', userRole);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res, 500, 'Server error', err);
    }
};

// Get all user roles
exports.getAllUserRoles = async (req, res) => {
    try {
        const userRoles = await UserRole.find();
        sendSuccessResponse(res, 200, 'User roles fetched successfully', userRoles);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res, 500, 'Server error', err);
    }
};

// Get all user roles for select list
exports.getUserRolesSelectList = async (req, res) => {
    try {
        const userRoles = await UserRole.find().select('_id name');
        const userRoleList = userRoles.map(role => ({ id: role._id, value: role.name }));
        sendSuccessResponse(res, 200, 'User roles fetched successfully', userRoleList);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res, 500, 'Server error', err);
    }
};

// Get a user role by ID
exports.getUserRoleById = async (req, res) => {
    try {
        const userRole = await UserRole.findById(req.params.id);
        if (!userRole) {
            return sendErrorResponse(res, 404, 'User role not found');
        }
        sendSuccessResponse(res, 200, 'User role fetched successfully', userRole);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res, 500, 'Server error', err);
    }
};

// Update a user role
exports.updateUserRole = async (req, res) => {
    const { name } = req.body;

    try {
        const userRole = await UserRole.findById(req.params.id);
        if (!userRole) {
            return sendErrorResponse(res, 404, 'User role not found');
        }

        userRole.name = name || userRole.name;
        const updatedUserRole = await userRole.save();
        sendSuccessResponse(res, 200, 'User role updated successfully', updatedUserRole);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res, 500, 'Server error', err);
    }
};

// Delete a user role
exports.deleteUserRole = async (req, res) => {
    try {
        const userRole = await UserRole.findByIdAndDelete(req.params.id);
        if (!userRole) {
            return sendErrorResponse(res, 404, 'User role not found');
        }
        sendSuccessResponse(res, 200, 'User role deleted successfully');
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res, 500, 'Server error', err);
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await UserRole.find(); // or your data-fetching logic
        res.json(roles);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ message: 'Error fetching roles' });
    }
};
