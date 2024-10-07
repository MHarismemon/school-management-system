// src/api/guardianStudentsApi.js

import axiosInstance from '../axiosInstance';

export const getStudentsByGuardian = async () => {
    try {
        const guardianId = localStorage.getItem('adminSelfId');

        if (!guardianId) {
            throw new Error('Guardian ID not found in localStorage.');
        }

        const response = await axiosInstance.get('/guardian-students/get-students', {
            params: {
                guardianId,
            },
        });

        return response.data.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error.response?.data || { message: 'An error occurred while fetching students.' };
    }
};
