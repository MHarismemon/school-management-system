// controllers/superAdminLeaveController.js

const BranchAdminLeave = require('../models/BranchAdminLeave');

// Get all branch admin leaves
exports.getAllLeaves = async (req, res) => {
    try {
        const leaves = await BranchAdminLeave.find().populate('branchAdminId');
        res.status(200).json({ success: true, data: leaves });
    } catch (error) {
        console.error('Error fetching all leaves:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Create a new leave
exports.createLeaveBySuperAdmin = async (req, res) => {
    try {
        const {
            branchAdminId,
            leaveStartDate,
            leaveEndDate,
            leaveReason,
            description,
            totalLeaveDays,
            status,
        } = req.body;

        if (!branchAdminId) {
            return res.status(400).json({ success: false, message: 'Branch Admin ID is required' });
        }

        const newLeave = new BranchAdminLeave({
            branchAdminId,
            leaveStartDate,
            leaveEndDate,
            leaveReason,
            description,
            totalLeaveDays,
            status: status || 'Pending',
        });

        // Handle file upload
        if (req.file) {
            newLeave.doc = `/uploads/${req.file.filename}`;
        }

        await newLeave.save();

        res.status(201).json({ success: true, data: newLeave });
    } catch (error) {
        console.error('Error creating leave:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Update a leave
exports.updateLeaveBySuperAdmin = async (req, res) => {
    try {
        const { leaveId } = req.params;
        const updateData = req.body;

        const updatedLeave = await BranchAdminLeave.findByIdAndUpdate(leaveId, updateData, { new: true });

        if (!updatedLeave) {
            return res.status(404).json({ success: false, message: 'Leave not found' });
        }

        res.status(200).json({ success: true, data: updatedLeave });
    } catch (error) {
        console.error('Error updating leave:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Delete a leave
exports.deleteLeaveBySuperAdmin = async (req, res) => {
    try {
        const { leaveId } = req.params;

        const deletedLeave = await BranchAdminLeave.findByIdAndDelete(leaveId);

        if (!deletedLeave) {
            return res.status(404).json({ success: false, message: 'Leave not found' });
        }

        res.status(200).json({ success: true, message: 'Leave deleted successfully' });
    } catch (error) {
        console.error('Error deleting leave:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Update teacher leave status
exports.updateSuperAdminLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Check if status is provided and valid
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const leave = await BranchAdminLeave.findById(id);
        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }

        // Update the status
        leave.status = status;
        await leave.save();

        res.status(200).json({ message: `Leave status updated to ${status} successfully` });
    } catch (error) {
        console.error('Error updating leave status:', error);
        res.status(500).json({ message: 'Error updating leave status', error });
    }
};