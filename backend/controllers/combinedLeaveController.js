const TeacherLeave = require('../models/TeacherLeave');
const StaffLeave = require('../models/StaffLeave');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');

// Get combined teacher and staff leaves
exports.getCombinedLeaves = async (req, res) => {
    const { branchId } = req.query;

    if (!branchId) {
        return sendErrorResponse(res, 400, 'Branch ID is required.');
    }

    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(branchId)) {
        return sendErrorResponse(res, 400, 'Invalid Branch ID format.');
    }

    try {
        const teacherLeaves = await TeacherLeave.find({ branchId })
            .populate('teacherId', 'fullName teacherId')
            .populate('branchId', 'branchName')
            .lean();

        const processedTeacherLeaves = teacherLeaves.map((leave) => ({
            ...leave,
            userType: 'Teacher',
        }));

        const staffLeaves = await StaffLeave.find({ branchId })
            .populate('staffId', 'fullName staffId')
            .populate('branchId', 'branchName')
            .lean();

        const processedStaffLeaves = staffLeaves.map((leave) => ({
            ...leave,
            userType: 'Staff',
        }));

        const combinedLeaves = [...processedTeacherLeaves, ...processedStaffLeaves];

        sendSuccessResponse(res, 200, 'Combined leaves fetched successfully', combinedLeaves);
    } catch (error) {
        console.error('Error fetching combined leaves:', error);
        sendErrorResponse(res, 500, 'Server error', error);
    }
};
