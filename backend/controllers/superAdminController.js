// controllers/superAdminController.js

const Teacher = require('../models/Teacher');
const Staff = require('../models/Staff');
const Branch = require('../models/Branch');
const Student = require('../models/Student');
const Class = require('../models/Class');
const ClassAttendance = require('../models/ClassAttendance'); // Assuming for chart data
const moment = require('moment');

// Utility functions for sending responses
const sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({ success: false, message });
};

const sendSuccessResponse = (res, data) => {
    res.status(200).json({ success: true, data });
};

// Controller to get dashboard counts and chart data
exports.getDashboardData = async (req, res) => {
    try {
        // Total Teachers
        const totalTeachers = await Teacher.countDocuments();

        // Total Branches
        const totalBranches = await Branch.countDocuments();

        // Total Admin Staff
        const totalAdminStaff = await Staff.countDocuments();
        
        // Total Students
        const totalStudents = await Student.countDocuments();

        // Example Chart Data: Monthly Attendance for the current year
        const currentYear = moment().year();
        const monthlyAttendance = [];

        for (let month = 1; month <= 12; month++) {
            const attendanceCount = await ClassAttendance.countDocuments({
                month,
                year: currentYear,
            });
            monthlyAttendance.push(attendanceCount);
        }

        // Example Chart Data: Student Analysis (e.g., number of students per class)
        const classes = await Class.find(); // Ensure you have a Class model
        const studentAnalysis = [];

        for (let cls of classes) {
            const count = await Student.countDocuments({ classId: cls._id });
            studentAnalysis.push({
                className: cls.className, // Ensure 'className' field exists
                studentCount: count,
            });
        }

        // Consolidate all data
        const dashboardData = {
            totalTeachers,
            totalBranches,
            totalAdminStaff,
            totalStudents,
            monthlyAttendance,
            studentAnalysis,
        };

        sendSuccessResponse(res, dashboardData);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        sendErrorResponse(res, 500, 'Server Error: Unable to fetch dashboard data.');
    }
};
