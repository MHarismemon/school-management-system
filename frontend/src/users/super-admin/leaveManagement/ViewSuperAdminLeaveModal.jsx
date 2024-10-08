// src/components/superAdminLeaveManagement/ViewSuperAdminLeaveModal.jsx

import React from 'react';
import Swal from 'sweetalert2';
import { baseURLDoc } from '../../../index';
import { updateLeave } from '../../../api/super-admin/superAdminLeaveApi';

const ViewSuperAdminLeaveModal = ({ showModal, setShowModal, leave, reloadLeaves }) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };


  // Handle status change
  const handleStatusChange = async (status) => {
    try {
      await updateLeave(leave._id, { status });
      Swal.fire('Success!', `Leave has been ${status}.`, 'success');
      setShowModal(false);
      reloadLeaves();
    } catch (error) {
      Swal.fire('Error!', 'Failed to update leave status.', 'error');
      console.error(error);
    }
  };

  if (!showModal || !leave) return null;

  // Correctly extract the filename
  const filename = leave.doc ? leave.doc.split(/[\\/]/).pop() : '';

  // Construct the correct document URL
  const documentUrl = filename ? `${baseURLDoc}docs/${filename}` : '';

  return (
    <div
      id="modalOverlay"
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target.id === 'modalOverlay') handleCloseModal();
      }}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Leave Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold">Branch Admin Name</label>
            <p>{leave.branchAdminId?.fullName || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Leave Reason</label>
            <p>{leave.leaveReason}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Start Date</label>
            <p>{new Date(leave.leaveStartDate).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">End Date</label>
            <p>{new Date(leave.leaveEndDate).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Total Days</label>
            <p>{leave.totalLeaveDays}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Status</label>
            <p>{leave.status}</p>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold">Description</label>
            <p>{leave.description || 'N/A'}</p>
          </div>

          {/* Document */}
          <div className="col-span-2 mt-4">
            <label className="block text-gray-700 font-semibold">Document</label>
            {leave.doc ? (
              <p className="mt-2">
                <a
                  href={documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Download/View Full PDF
                </a>
              </p>
            ) : (
              <p className="mt-2 text-gray-500">No document available.</p>
            )}
          </div>
        </div>

        {/* Approve/Reject buttons */}
        {leave.status === 'Pending' && (
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => handleStatusChange('Approved')}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Approve
            </button>
            <button
              type="button"
              onClick={() => handleStatusChange('Rejected')}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        )}

        <div className="flex justify-end mt-4">
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

export default ViewSuperAdminLeaveModal;
