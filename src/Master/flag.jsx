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

const Flag = () => {
    const [hoveredRows, setHoveredRows] = useState(null);
    const [flagName, setFlagName] = useState([]);
    const [newFlagName, setNewFlagName] = useState('');
    const [deleteRowIndex, setDeleteRowIndex] = useState(null);
    // const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

    const handleMouseEnter = (index) => {
        setHoveredRows(index);
    };

    const handleMouseLeave = () => {
        setHoveredRows(null);
    };

    useEffect(() => {
        const storedFlag = JSON.parse(localStorage.getItem('flagName')) || [];
        console.log('Stored Flag:', storedFlag);
        setFlagName(storedFlag);
    }, []);

    const handleAddFlag = () => {
        if (!newFlagName.trim()) {
            // setIsErrorPopupOpen(true);
            return;
        }

        // setIsErrorPopupOpen(false);
        const updatedFlag = [...flagName, {  id: uuidv4(), flagName: newFlagName.trim()}];
        console.log('Updated Flag:', updatedFlag);
        setFlagName(updatedFlag);
        setNewFlagName('');
        localStorage.setItem('flagName', JSON.stringify(updatedFlag));
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
        return flagName.slice().sort((a, b) => {
            const aValue = a.flagName;
            const bValue = b.flagName;
            return aValue.localeCompare(bValue);
        });
    }, [flagName]);

    const handleConfirmDelete = () => {
        if (!flagName) {
            console.error('Flag array is undefined');
            return;
        }
        const flagNameToDelete = sortedData[deleteRowIndex];
        const updatedFlag = flagName.filter(s => s.id !== flagNameToDelete.id);
        setFlagName(updatedFlag);
        localStorage.setItem('flagName', JSON.stringify(updatedFlag));
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

    const visibleProducts = flagName.slice(startIndex, endIndex);

    const [editedFlag, setEditedFlag] = useState('');

    const handleRowClick = (flagName) => {
        if (selectedFlagForEdit === flagName) {
            setSelectedFlagForEdit([]);
            setEditedFlag('');
        } else {
            setSelectedFlagForEdit(flagName);
            setEditedFlag(flagName.flagName);
        }
    };

    const handleUpdateFlag = () => {
        const updatedFlagList = flagName.map((f) =>
            f.id === selectedFlagForEdit.id  ? { ...f, flagName: editedFlag} : f
        );
        setFlagName(updatedFlagList);
        setSelectedFlagForEdit(null);
        localStorage.setItem('flagName', JSON.stringify(updatedFlagList));
        toast.success('Updated Successfully');

    };

    const handleCancelUpdate = () => {
        setSelectedFlagForEdit(null);
        setEditedFlag('');
    };
    const [selectedFlagForEdit, setSelectedFlagForEdit] = useState();

    const columns = [
        { title: 'Flag', key: 'flagName' }
    ];

    return (
        <div>
            <Headers />
            <div className={`p-2 bg-[#d9d9d9] custom-class font-roboto `}>
                <div className={`ml-52 bg-white rounded lg:mt-3 dark:border-gray-700 mt-5 shadow-xl`}>
                    <div className="mb-4">
                        <div className='panel-heading row py-2 px-5 text-gray border-b border-b-[#0000001f] flex items-center justify-between'>
                            <h3 className='text-base font-medium uppercase'>Flag Settings</h3>
                        </div>
                        <div className='my-10 mx-10'>
                            {selectedFlagForEdit && (
                                <><div className='flex'>
                                    <label className='text-dark-gray text-ssm font-medium'>Flag Name<span className="text-red-500">&nbsp;*</span></label>
                                </div><div className='flex items-center'>
                                        <input
                                            type="text"
                                            placeholder='Flag Name'
                                            name='flagName'
                                            className='flagName border border-light-gray focus:outline-none text-sm required focus:border-light-gray focus:rounded px-3 py-1.5 w-4/12'
                                            value={editedFlag}
                                            onChange={(e) => setEditedFlag(e.target.value)}
                                            />
                                        <button className='bg-yellow-500 text-white px-3 py-0.5 ml-2 flex items-center' onClick={handleUpdateFlag}>
                                        <ion-icon name="cloud-done" /><span className='m-1'>Update</span>
                                        </button>
                                        <button className='bg-red-500 text-white px-3 py-1.5 ml-2' onClick={handleCancelUpdate}>
                                            Cancel
                                        </button>
                                    </div></>
                            )}
                            {!selectedFlagForEdit && (
                                <><div className='flex'>
                                    <label className='text-dark-gray text-ssm font-medium'>Flag Name<span className="text-red-500">&nbsp;*</span></label>
                                </div><div className='flex items-center'>
                                        <input
                                            type="text"
                                            placeholder='Flag Name'
                                            name='flagName'
                                            className='flagName border border-light-gray focus:outline-none text-sm required focus:border-light-gray focus:rounded px-3 py-1.5 w-4/12'
                                            value={newFlagName}
                                            onChange={(e) => setNewFlagName(e.target.value)} />
                                        <button type='button' className='add-btn flex items-center bg-hover-red ml-6 px-4 py-1 text-white disabled:opacity-80' onClick={handleAddFlag} disabled={!newFlagName.trim()}>
                                        <ion-icon name="cloud-done" /><span className='m-1'>Add</span> 
                                        </button>
                                    </div></>
                            )}
                        </div>
                       
                        <div className="relative overflow-x-auto shadow-md my-10 mx-10">

                            <SortingTable
                                data={flagName}
                                columns={columns}
                                onUpdateFlag={handleUpdateFlag}
                                actions={{
                                    delete: true,
                                    onDelete: handleTrashClick,
                                    edit: true,
                                    onEdit : (rowData) => handleRowClick(rowData)
                                }}

                            />

                            {flagName && deleteRowIndex !== null && (
                                <ConfirmModal
                                    isConfirmOpen={true}
                                    isConfirmClose={closeConfirmModal}
                                    flagName={flagName}
                                    rowIndex={deleteRowIndex}
                                    onConfirm={handleConfirmDelete}
                                />
                            )}

                            <TablePagination
                                totalItems={flagName.length}
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

export default Flag;
