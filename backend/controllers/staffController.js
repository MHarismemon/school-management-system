// controllers/staffController.js

const bcrypt = require('bcrypt');
const User = require('../models/User');
const Staff = require('../models/Staff');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');
const { validateRequiredFields } = require('../utils/validateRequiredFields');
const uploadStaff = require('../middleware/uploadStaff');

// Create a new Staff member
exports.registerStaff = (req, res) => {
    uploadStaff.single("photo")(req, res, async (err) => {
        if (err) {
            return sendErrorResponse(res, 400, "Image upload failed", err);
        }

        const {
            fullName,
            cnicNumber,
            phoneNumber,
            address,
            gender,
            cast,
            basicSalary,
            staffId,
            joinDate,
            staffType,
            branchId
        } = req.body;

        const photo = req.file ? req.file.filename : null;

        const missingFields = validateRequiredFields({
            fullName,
            cnicNumber,
            phoneNumber,
            address,
            gender,
            cast,
            basicSalary,
            staffId,
            joinDate,
            staffType,
            branchId
        });

        if (missingFields.length > 0) {
            return sendErrorResponse(res, 400, `Missing fields: ${missingFields.join(', ')}`);
        }

        let formattedJoinDate;
        try {

            const existingUserId = await Staff.findOne({ staffId });
            if (existingUserId) {
                return sendErrorResponse(res, 400, 'Staff ID already exists');
            }

            formattedJoinDate = new Date(joinDate).toISOString();
        } catch (dateError) {
            return sendErrorResponse(res, 400, 'Invalid date format', dateError);
        }

        try {
            const staff = new Staff({
            fullName,
            cnicNumber,
            phoneNumber,
            address,
            gender,
            cast,
            basicSalary,
            staffId,
            joinDate,
            staffType,
            branchId,
            photo
            });

            const savedStaff = await staff.save();

            sendSuccessResponse(res, 201, 'Staff registered successfully', savedStaff);
        } catch (err) {
            if (err.name === 'ValidationError') {
                const errorMessages = Object.values(err.errors).map(e => ({
                    path: e.path,
                    message: e.message
                }));
                sendErrorResponse(res, 400, 'Validation error', {
                    errors: errorMessages,
                    _message: err.message,
                    name: err.name
                });
            } else {
                console.error(err.message);
                sendErrorResponse(res, 500, 'Server error', err);
            }
        }
    });
};

// Update Staff by ID
exports.updateStaff = (req, res) => {
    uploadStaff.single("photo")(req, res, async (err) => {
        if (err) {
            return sendErrorResponse(res, 400, "Image upload failed", err);
        }

        const { id } = req.params;
        const {
            fullName,
            cnicNumber,
            phoneNumber,
            address,
            gender,
            cast,
            basicSalary,
            joinDate,
            staffType,
            branchId
        } = req.body;

        const photo = req.file ? req.file.filename : null;

        try {

            // Update the staff details with the provided data
            const updatedStaff = await Staff.findByIdAndUpdate(
                id,
                {
                    fullName,
                    cnicNumber,
                    phoneNumber,
                    address,
                    gender,
                    cast,
                    basicSalary,
                    staffType,
                    branchId,
                    joinDate: joinDate ? new Date(joinDate) : undefined,
                    ...(photo && { photo }), // Update photo if provided
                },
                { new: true, runValidators: true } // Options: return the updated document and run validators
            );

            if (!updatedStaff) {
                return sendErrorResponse(res, 404, 'Staff member not found');
            }

            sendSuccessResponse(res, 200, 'Staff updated successfully', updatedStaff);
        } catch (err) {
            // Handle validation errors
            if (err.name === 'ValidationError') {
                const errorMessages = Object.values(err.errors).map(e => ({
                    path: e.path,
                    message: e.message
                }));

                sendErrorResponse(res, 400, 'Validation error', {
                    errors: errorMessages,
                    _message: err.message,
                    name: err.name
                });
            } else {
                console.error(err.message);
                sendErrorResponse(res, 500, 'Server error', err);
            }
        }
    });
};

// Get all Staff for a specific branch
exports.getAllStaff = async (req, res) => {
    const { branchId } = req.query;

    if (!branchId) {
        return sendErrorResponse(res, 400, 'Branch ID is required');
    }

    try {
        const staff = await Staff.find({ branchId }).populate('branchId');
        sendSuccessResponse(res, 200, 'Staff members retrieved successfully', staff);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res, 500, 'Server error', err);
    }
};

// Get Staff by ID
exports.getStaffById = async (req, res) => {
    const { id } = req.params;

    try {
        const staff = await Staff.findById(id).populate('branchId');
        if (!staff) {
            return sendErrorResponse(res, 404, 'Staff member not found');
        }
        sendSuccessResponse(res, 200, 'Staff member retrieved successfully', staff);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res, 500, 'Server error', err);
    }
};

// Delete Staff by ID
exports.deleteStaff = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStaff = await Staff.findByIdAndDelete(id);

        if (!deletedStaff) {
            return sendErrorResponse(res, 404, 'Staff member not found');
        }

        sendSuccessResponse(res, 200, 'Staff member deleted successfully', deletedStaff);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res, 500, 'Server error', err);
    }
};
