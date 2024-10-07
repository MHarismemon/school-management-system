// src/users/super-admin/SuperAdminDashboard.jsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthProvider';
import img1 from '../../assets/teacher.png';
import img2 from '../../assets/staff.png';
import img3 from '../../assets/present.png';
import img4 from '../../assets/emp.png';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { getDashboardData } from '../../api/superAdminApi'; // Import the API function
import Swal from 'sweetalert2';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const SuperAdminDashboard = () => {
    const { userInfo } = useAuth();

    // State variables for counts
    const [totalTeachers, setTotalTeachers] = useState(0);
    const [totalBranches, setTotalBranches] = useState(0);
    const [totalAdminStaff, setTotalAdminStaff] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);

    // State variables for charts
    const [monthlyAttendance, setMonthlyAttendance] = useState([]);
    const [studentAnalysis, setStudentAnalysis] = useState([]);

    // Loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const data = await getDashboardData();
                setTotalTeachers(data.totalTeachers);
                setTotalBranches(data.totalBranches);
                setTotalAdminStaff(data.totalAdminStaff);
                setTotalStudents(data.totalStudents);
                setMonthlyAttendance(data.monthlyAttendance);
                setStudentAnalysis(data.studentAnalysis);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || 'Failed to load dashboard data.',
                    confirmButtonText: 'OK',
                });
                console.error("error",error);
            }
        };

        fetchDashboardData();
    }, []);

    // Prepare data for charts
    const dataBar = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: 'Monthly Attendance',
                data: monthlyAttendance, // Dynamic data
                backgroundColor: '#6f9bf2',
            },
        ],
    };

    const dataLine = {
        labels: studentAnalysis.map(item => item.className),
        datasets: [
            {
                label: 'Number of Students',
                data: studentAnalysis.map(item => item.studentCount),
                borderColor: '#6f9bf2',
                backgroundColor: 'rgba(111, 155, 242, 0.1)',
                fill: true,
            },
        ],
    };

    return (
        <div className="container mx-auto px-4">
            <div className="mb-4">
                <p className="text-custom-blue text-lg md:text-xl">
                    Welcome Back Super Admin, <b>{userInfo.username}</b>
                </p>
                <p className="text-gray-500 text-sm md:text-base">
                    Track your Analytics and Manage your School Branch
                </p>
            </div>

            {/* Grid for Analytics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4">
                <div className="bg-custom-white flex flex-col gap-4 py-3 pr-4 pl-6 border rounded-lg">
                    <p className="text-custom-text-color font-medium">Total Teachers</p>
                    <div className="flex flex-row gap-3 items-center">
                        <img src={img1} alt="Total Teachers" className="w-12 h-12" />
                        <h6 className="text-2xl font-bold text-custom-number-color">
                            {loading ? '...' : totalTeachers}
                        </h6>
                    </div>
                </div>
                <div className="bg-custom-white flex flex-col gap-4 py-3 pr-4 pl-6 border rounded-lg">
                    <p className="text-custom-text-color font-medium">Total Branches</p>
                    <div className="flex flex-row gap-3 items-center">
                        <img src={img2} alt="Total Branches" className="w-12 h-12" />
                        <h6 className="text-2xl font-bold text-custom-number-color">
                            {loading ? '...' : totalBranches}
                        </h6>
                    </div>
                </div>
                <div className="bg-custom-white flex flex-col gap-4 py-3 pr-4 pl-6 border rounded-lg">
                    <p className="text-custom-text-color font-medium">Total Admin Staff</p>
                    <div className="flex flex-row gap-3 items-center">
                        <img src={img3} alt="Total Admin Staff" className="w-12 h-12" />
                        <h6 className="text-2xl font-bold text-custom-number-color">
                            {loading ? '...' : totalAdminStaff}
                        </h6>
                    </div>
                </div>
                <div className="bg-custom-white flex flex-col gap-4 py-3 pr-4 pl-6 border rounded-lg">
                    <p className="text-custom-text-color font-medium">Total Students</p>
                    <div className="flex flex-row gap-3 items-center">
                        <img src={img4} alt="Total Students" className="w-12 h-12" />
                        <h6 className="text-2xl font-bold text-custom-number-color">
                            {loading ? '...' : totalStudents}
                        </h6>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-medium text-gray-800">Monthly Attendance</h2>
                    <div className="mt-4">
                        <Bar data={dataBar} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-medium text-gray-800">Student Analysis</h2>
                    <div className="mt-4">
                        <Line data={dataLine} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
