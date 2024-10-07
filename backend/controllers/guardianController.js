const bcrypt = require('bcrypt');
const Guardian = require('../models/Guardian');
const User = require('../models/User');
const Branch = require('../models/Branch');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');
const { validateRequiredFields } = require('../utils/validateRequiredFields');

// Create Guardian
exports.createGuardian = async (req, res) => {
    const {
        username, password, email, userRole,
        fullName, relationship, workOrganisation, workStatus, cnicNumber,
        studentMotherName, motherCnicNumber, motherOccupation,
        guardianPhoneNumber, residentialAddress, workAddress, branchId
    } = req.body;

    // Validate required fields for User and Guardian
    const missingFields = validateRequiredFields({
        username, password, email, userRole,
        fullName, relationship, workOrganisation, workStatus, cnicNumber,
        studentMotherName, motherCnicNumber, motherOccupation,
        guardianPhoneNumber, residentialAddress, workAddress, branchId
    });
    if (missingFields.length > 0) {
        return sendErrorResponse(res, 400, `Missing fields: ${missingFields.join(', ')}`);
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return sendErrorResponse(res, 400, 'Email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new User entry
        const user = new User({
            username,
            password: hashedPassword,
            email,
            userRole
        });

        const savedUser = await user.save();

        // Create a new Guardian entry
        const guardian = new Guardian({
            fullName,
            relationship,
            workOrganisation,
            workStatus,
            cnicNumber,
            studentMotherName,
            motherCnicNumber,
            motherOccupation,
            guardianPhoneNumber,
            residentialAddress,
            workAddress,
            userId: savedUser._id,
            branchId
        });

        const savedGuardian = await guardian.save();

        sendSuccessResponse(res, 201, 'Guardian registered successfully', {
            user: savedUser,
            guardian: savedGuardian
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Handle Mongoose validation errors
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
};

// Get All Guardians
exports.getAllGuardians = async (req, res) => {
    const { branchId } = req.query;

    if (!branchId) {
        return sendErrorResponse(res, 400, 'Branch ID is required');
    }

    try {
        const guardians = await Guardian.find({ branchId }).populate('userId', 'username email userRole').populate('branchId', 'branchName branchType');
        sendSuccessResponse(res, 200, 'Guardians retrieved successfully', guardians);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res, 500, 'Server error', err);
    }
};

// Get Guardian by ID
exports.getGuardianById = async (req, res) => {
    const { id } = req.params;

    try {
        const guardian = await Guardian.findById(id).populate('userId', 'username email userRole').populate('branchId', 'branchName branchType');
        if (!guardian) {
            return sendErrorResponse(res, 404, 'Guardian not found');
        }
        sendSuccessResponse(res, 200, 'Guardian retrieved successfully', guardian);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res, 500, 'Server error', err);
    }
};

// Update Guardian
exports.updateGuardian = async (req, res) => {
    const { id } = req.params;
    const {
        fullName, relationship, workOrganisation, workStatus, cnicNumber,
        studentMotherName, motherCnicNumber, motherOccupation,
        guardianPhoneNumber, residentialAddress, workAddress, branchId,
        password
    } = req.body;

    try {
        const updatedGuardian = await Guardian.findByIdAndUpdate(
            id,
            {
                fullName,
                relationship,
                workOrganisation,
                workStatus,
                cnicNumber,
                studentMotherName,
                motherCnicNumber,
                motherOccupation,
                guardianPhoneNumber,
                residentialAddress,
                workAddress,
                branchId
            },
            { new: true, runValidators: true }
        );

        if (!updatedGuardian) {
            return sendErrorResponse(res, 404, 'Guardian not found');
        }

        if (password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const userId = updatedGuardian.userId;
            if (!userId) {
                return sendErrorResponse(res, 400, 'Associated user not found for this guardian');
            }

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { password: hashedPassword },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return sendErrorResponse(res, 404, 'Associated user not found');
            }
        }

        sendSuccessResponse(res, 200, 'Guardian updated successfully', updatedGuardian);
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
};


// Delete Guardian
exports.deleteGuardian = async (req, res) => {
    const { id } = req.params;

    try {
        const guardian = await Guardian.findByIdAndDelete(id);
        if (!guardian) {
            return sendErrorResponse(res, 404, 'Guardian not found');
        }

        // Optionally, delete the associated user if you prefer
        await User.findByIdAndDelete(guardian.userId);

        sendSuccessResponse(res, 200, 'Guardian deleted successfully', guardian);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res, 500, 'Server error', err);
    }
};

exports.getGuardianByCnic = async (req, res) => {
    const { cnic } = req.params;
    
    try {
        const guardian = await Guardian.findOne({ cnicNumber: cnic }).populate('userId');
        if (!guardian) {
            return sendErrorResponse(res, 404, 'Guardian not found');
        }
        sendSuccessResponse(res, 200, 'Guardian retrieved successfully', guardian);
    } catch (err) {
        console.error(err.message);
        sendErrorResponse(res, 500, 'Server error', err);
    }
};
