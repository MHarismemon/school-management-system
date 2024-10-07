import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { fetchHolidays, deleteHoliday } from '../../api/super-admin/superAdminHoliday';
import AddHolidayModal from './holiday/AddHolidayModal';
import UpdateHolidayModal from './holiday/UpdateHolidayModal';
import ViewHolidayModal from './holiday/ViewHolidayModal';
import { AiFillEdit, AiFillDelete, AiFillEye } from 'react-icons/ai';
import moment from 'moment';

const HolidayManagement = () => {
    const [holidays, setHolidays] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedHoliday, setSelectedHoliday] = useState(null);

    useEffect(() => {
        loadHolidays();
    }, []);

    const loadHolidays = async () => {
        try {
            const data = await fetchHolidays();
            setHolidays(data);
        } catch (error) {
            console.error('Unable to fetch holidays. Please try again later.');
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteHoliday(id);
                    setHolidays(holidays.filter((holiday) => holiday._id !== id));
                    Swal.fire('Deleted!', 'Holiday deleted successfully.', 'success');
                    loadHolidays();
                } catch (error) {
                    console.error('Unable to delete holiday:', error);
                    Swal.fire('Error!', 'Unable to delete holiday. Please try again later.', 'error');
                }
            }
        });
    };

    const handleViewClick = (holiday) => {
        setSelectedHoliday(holiday);
        setShowViewModal(true);
    };

    const handleEditClick = (holiday) => {
        setSelectedHoliday(holiday);
        setShowUpdateModal(true);
    };

    const filteredData = holidays.filter(
        (holiday) =>
            holiday.leaveTitle.toLowerCase().includes(filterText.toLowerCase()) ||
            holiday.description.toLowerCase().includes(filterText.toLowerCase())
    );

    const columns = [
        {
            name: 'S No',
            selector: (row, index) => index + 1,
            width: '90px',
        },
        {
            name: 'Leave Title',
            selector: (row) => row.leaveTitle,
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row) => row.description,
            sortable: true,
        },
        {
            name: 'Date',
            selector: (row) => moment(row.date).format('YYYY-MM-DD'),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex space-x-3">
                    <AiFillEye className="text-blue-500 cursor-pointer" onClick={() => handleViewClick(row)} />
                    <AiFillEdit className="text-green-500 cursor-pointer" onClick={() => handleEditClick(row)} />
                    <AiFillDelete className="text-red-500 cursor-pointer" onClick={() => handleDelete(row._id)} />
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                fontSize: '14px',
                fontWeight: '600',
                backgroundColor: '#F3F4F6',
                color: '#374151',
                padding: '16px',
            },
        },
        cells: {
            style: {
                fontSize: '14px',
                padding: '16px',
            },
        },
        rows: {
            style: {
                '&:nth-of-type(even)': {
                    backgroundColor: '#F9FAFB',
                },
            },
        },
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold text-indigo-700">Holiday Management</h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Add Holiday
                </button>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 border border-gray-300 rounded-md w-full"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
            </div>
            <DataTable columns={columns} data={filteredData} customStyles={customStyles} pagination />

            {showAddModal && (
                <AddHolidayModal showModal={showAddModal} setShowModal={setShowAddModal} reloadData={loadHolidays} />
            )}
            {showViewModal && selectedHoliday && (
                <ViewHolidayModal showModal={showViewModal} setShowModal={setShowViewModal} holiday={selectedHoliday} />
            )}
            {showUpdateModal && selectedHoliday && (
                <UpdateHolidayModal
                    showModal={showUpdateModal}
                    setShowModal={setShowUpdateModal}
                    holiday={selectedHoliday}
                    reloadData={loadHolidays}
                />
            )}
        </div>
    );
};

export default HolidayManagement;
