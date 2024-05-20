import React, { useState, useEffect, useMemo } from 'react';
import Headers from '../Components/header';
import ConfirmModal from '../Product/confirmModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import TablePagination from '../Components/TablePagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import SortingTable from '../Components/SortingTable';
import { v4 as uuidv4 } from 'uuid';

const SOStatus = () => {
    const [hoveredRows, setHoveredRows] = useState(null);
    const [soStatus, setSoStatus] = useState([]);
    const [newSoStatus, setNewSoStatus] = useState('');
    const [deleteRowIndex, setDeleteRowIndex] = useState(null);
    // const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

    const handleMouseEnter = (index) => {
        setHoveredRows(index);
    };

    const handleMouseLeave = () => {
        setHoveredRows(null);
    };

    useEffect(() => {
        const storedSOStatus = JSON.parse(localStorage.getItem('soStatus')) || [];
        console.log('Stored SOStatus:', storedSOStatus);
        setSoStatus(storedSOStatus);
    }, []);

    const handleAddSOStatus = () => {
        if (!newSoStatus.trim()) {
            // setIsErrorPopupOpen(true);
            return;
        }

        // setIsErrorPopupOpen(false);
        const updatedSOStatus = [...soStatus, {  id: uuidv4(), soStatus: newSoStatus.trim()}];
        console.log('Updated SOStatus:', updatedSOStatus);
        setSoStatus(updatedSOStatus);
        setNewSoStatus('');
        localStorage.setItem('soStatus', JSON.stringify(updatedSOStatus));
        toast.success('Successfully Inserted');
    };
    const handleTrashClick = (index) => {
        setDeleteRowIndex(index);
    };

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const openConfirmModal = () => {
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
        setDeleteRowIndex(null);
    }

    const sortedData = useMemo(() => {
        return soStatus.slice().sort((a, b) => {
            const aValue = a.soStatus;
            const bValue = b.soStatus;
            return aValue.localeCompare(bValue);
        });
    }, [soStatus]);

    const handleConfirmDelete = () => {
        if (!soStatus) {
            console.error('SOStatus array is undefined');
            return;
        }
        const soStatusToDelete = sortedData[deleteRowIndex];
        const updatedSOStatus = soStatus.filter(s => s.id !== soStatusToDelete.id);
        setSoStatus(updatedSOStatus);
        localStorage.setItem('soStatus', JSON.stringify(updatedSOStatus));
        setIsConfirmModalOpen(false);
        setDeleteRowIndex(null);
    };


    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    const handleChangeRowsPerPage = (event) => {
        const value = parseInt(event.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
    };


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const visibleProducts = soStatus.slice(startIndex, endIndex);

    const [editedSOStatus, setEditedSOStatus] = useState('');

    const handleRowClick = (soStatus) => {
        if (selectedSOStatusForEdit === soStatus) {
            setSelectedSOStatusForEdit([]);
            setEditedSOStatus('');
        } else {
            setSelectedSOStatusForEdit(soStatus);
            setEditedSOStatus(soStatus.soStatus);
        }
    };

    const handleUpdateSOStatus = () => {
        const updatedSOStatusList = soStatus.map((s) =>
            s.id === selectedSOStatusForEdit.id  ? { ...s, soStatus: editedSOStatus} : s
        );
        setSoStatus(updatedSOStatusList);
        setSelectedSOStatusForEdit(null);
        localStorage.setItem('soStatus', JSON.stringify(updatedSOStatusList));
        toast.success('Updated Successfully');

    };

    const handleCancelUpdate = () => {
        setSelectedSOStatusForEdit(null);
        setEditedSOStatus('');
    };
    const [selectedSOStatusForEdit, setSelectedSOStatusForEdit] = useState();

    const columns = [
        { title: 'SOStatus', key: 'soStatus' }
    ];

    return (
        <div>
            <Headers />
            <div className={`p-2 bg-[#d9d9d9] custom-class font-roboto `}>
                <div className={`ml-52 bg-white rounded lg:mt-3 dark:border-gray-700 mt-5 shadow-xl`}>
                    <div className="mb-4">
                        <div className='panel-heading row py-2 px-5 text-gray border-b border-b-[#0000001f] flex items-center justify-between'>
                            <h3 className='text-base font-medium uppercase'>SO Status</h3>
                        </div>
                        <div className='my-10 mx-10'>
                            {selectedSOStatusForEdit && (
                                <><div className='flex'>
                                    <label className='text-dark-gray text-ssm font-medium'>SO Status Name<span className="text-red-500">&nbsp;*</span></label>
                                </div><div className='flex items-center'>
                                        <input
                                            type="text"
                                            placeholder='SOStatus'
                                            name='soStatus'
                                            className='soStatus border border-light-gray focus:outline-none text-sm required focus:border-light-gray focus:rounded px-3 py-1.5 w-4/12'
                                            value={editedSOStatus}
                                            onChange={(e) => setEditedSOStatus(e.target.value)}
                                            />
                                        <button className='bg-yellow-500 text-white px-3 py-0.5 ml-2 flex items-center' onClick={handleUpdateSOStatus}>
                                        <ion-icon name="cloud-done" /><span className='m-1'>Update</span>
                                        </button>
                                        <button className='bg-red-500 text-white px-3 py-1.5 ml-2' onClick={handleCancelUpdate}>
                                            Cancel
                                        </button>
                                    </div></>
                            )}
                            {!selectedSOStatusForEdit && (
                                <><div className='flex'>
                                    <label className='text-dark-gray text-ssm font-medium'>SO Status Name<span className="text-red-500">&nbsp;*</span></label>
                                </div><div className='flex items-center'>
                                        <input
                                            type="text"
                                            placeholder='SOStatus'
                                            name='soStatus'
                                            className='soStatus border border-light-gray focus:outline-none text-sm required focus:border-light-gray focus:rounded px-3 py-1.5 w-4/12'
                                            value={newSoStatus}
                                            onChange={(e) => setNewSoStatus(e.target.value)} />
                                        <button type='button' className='add-btn flex items-center bg-hover-red ml-6 px-4 py-1 text-white disabled:opacity-80' onClick={handleAddSOStatus} disabled={!newSoStatus.trim()}>
                                        <ion-icon name="cloud-done" /><span className='m-1'>Add</span> 
                                        </button>
                                    </div></>
                            )}
                        </div>
                       
                        <div className="relative overflow-x-auto shadow-md my-10 mx-10">

                            <SortingTable
                                data={soStatus}
                                columns={columns}
                                onUpdateSOStatus={handleUpdateSOStatus}
                                actions={{
                                    delete: true,
                                    onDelete: handleTrashClick,
                                    edit: true,
                                    onEdit : (rowData) => handleRowClick(rowData)
                                }}

                            />

                            {soStatus && deleteRowIndex !== null && (
                                <ConfirmModal
                                    isConfirmOpen={true}
                                    isConfirmClose={closeConfirmModal}
                                    soStatus={soStatus}
                                    rowIndex={deleteRowIndex}
                                    onConfirm={handleConfirmDelete}
                                />
                            )}

                            <TablePagination
                                totalItems={soStatus.length}
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SOStatus;
