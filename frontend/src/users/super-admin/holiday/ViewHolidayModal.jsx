import React from 'react';
import moment from 'moment';

const ViewHolidayModal = ({ showModal, setShowModal, holiday }) => {
    if (!showModal) return null;

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Holiday Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-semibold">Leave Title</label>
                        <p>{holiday.leaveTitle}</p>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Description</label>
                        <p>{holiday.description}</p>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Date</label>
                        <p>{moment(holiday.date).format('YYYY-MM-DD')}</p>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Year</label>
                        <p>{holiday.year}</p>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Month</label>
                        <p>{holiday.month}</p>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewHolidayModal;
